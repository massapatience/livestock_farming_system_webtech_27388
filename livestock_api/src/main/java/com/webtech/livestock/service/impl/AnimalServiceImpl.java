package com.webtech.livestock.service.impl;

import com.webtech.livestock.exception.BusinessValidationException;
import com.webtech.livestock.exception.ResourceNotFoundException;
import com.webtech.livestock.model.Animal;
import com.webtech.livestock.model.Farmer;
import com.webtech.livestock.repository.AnimalRepository;
import com.webtech.livestock.repository.FarmerRepository;
import com.webtech.livestock.service.AnimalService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalServiceImpl implements AnimalService {

    private static final List<String> ALLOWED_SPECIES =
            List.of("Cattle", "Goat", "Sheep", "Pig", "Poultry");
    private static final List<String> ALLOWED_HEALTH_STATUSES =
            List.of("Healthy", "Under Treatment", "Sick", "Quarantined");

    private final AnimalRepository animalRepository;
    private final FarmerRepository farmerRepository;

    public AnimalServiceImpl(AnimalRepository animalRepository, FarmerRepository farmerRepository) {
        this.animalRepository = animalRepository;
        this.farmerRepository = farmerRepository;
    }

    @Override
    public Animal create(Animal animal, Long farmerId) {
        Farmer farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found with id " + farmerId));

        validateBusinessRules(animal);

        Optional<Animal> existingTag = animalRepository.findByTagNumber(animal.getTagNumber());
        if (existingTag.isPresent()) {
            throw new BusinessValidationException(
                    "An animal with tag number " + animal.getTagNumber() + " already exists.");
        }

        animal.setFarmer(farmer);
        return animalRepository.save(animal);
    }

    @Override
    public List<Animal> findAll() {
        return animalRepository.findAll();
    }

    @Override
    public Animal findById(Long id) {
        return animalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id " + id));
    }

    @Override
    public Animal update(Long id, Animal animal) {
        Animal existing = findById(id);
        validateBusinessRules(animal);

        if (!existing.getTagNumber().equals(animal.getTagNumber())) {
            animalRepository.findByTagNumber(animal.getTagNumber()).ifPresent(other -> {
                if (!other.getId().equals(id)) {
                    throw new BusinessValidationException(
                            "Tag number " + animal.getTagNumber() + " is already used by another animal.");
                }
            });
        }

        existing.setTagNumber(animal.getTagNumber());
        existing.setSpecies(animal.getSpecies());
        existing.setBreed(animal.getBreed());
        existing.setDateOfBirth(animal.getDateOfBirth());
        existing.setWeightKg(animal.getWeightKg());
        existing.setHealthStatus(animal.getHealthStatus());
        return animalRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        Animal existing = findById(id);
        if (existing.getHealthRecords() != null && !existing.getHealthRecords().isEmpty()) {
            // Business rule: keep veterinary history intact - don't silently cascade-delete it
            throw new BusinessValidationException(
                    "Cannot delete animal " + id + ": it has " + existing.getHealthRecords().size()
                            + " health record(s) on file. Remove those first.");
        }
        animalRepository.deleteById(id);
    }

    private void validateBusinessRules(Animal animal) {
        if (!ALLOWED_SPECIES.contains(animal.getSpecies())) {
            throw new BusinessValidationException(
                    "Species must be one of: " + String.join(", ", ALLOWED_SPECIES));
        }
        if (!ALLOWED_HEALTH_STATUSES.contains(animal.getHealthStatus())) {
            throw new BusinessValidationException(
                    "Health status must be one of: " + String.join(", ", ALLOWED_HEALTH_STATUSES));
        }
        // Business rule: a registered animal's weight should be realistic for a live animal
        if (animal.getWeightKg() != null && animal.getWeightKg() > 1500) {
            throw new BusinessValidationException("Weight of " + animal.getWeightKg()
                    + " kg looks unrealistic for a live animal - please double-check the value.");
        }
    }
}
