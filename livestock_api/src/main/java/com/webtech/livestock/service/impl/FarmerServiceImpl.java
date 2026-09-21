package com.webtech.livestock.service.impl;

import com.webtech.livestock.exception.BusinessValidationException;
import com.webtech.livestock.exception.ResourceNotFoundException;
import com.webtech.livestock.model.Farmer;
import com.webtech.livestock.repository.FarmerRepository;
import com.webtech.livestock.service.FarmerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FarmerServiceImpl implements FarmerService {

    private final FarmerRepository farmerRepository;

    public FarmerServiceImpl(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    @Override
    public Farmer create(Farmer farmer) {
        // Business rule: a phone number can only be registered to one farmer
        Optional<Farmer> existing = farmerRepository.findByPhoneNumber(farmer.getPhoneNumber());
        if (existing.isPresent()) {
            throw new BusinessValidationException(
                    "A farmer with phone number " + farmer.getPhoneNumber() + " is already registered.");
        }
        return farmerRepository.save(farmer);
    }

    @Override
    public List<Farmer> findAll() {
        return farmerRepository.findAll();
    }

    @Override
    public Farmer findById(Long id) {
        return farmerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found with id " + id));
    }

    @Override
    public Farmer update(Long id, Farmer farmer) {
        Farmer existing = findById(id);

        // Business rule: if the phone number is changing, it must not collide with another farmer
        if (!existing.getPhoneNumber().equals(farmer.getPhoneNumber())) {
            farmerRepository.findByPhoneNumber(farmer.getPhoneNumber()).ifPresent(other -> {
                if (!other.getId().equals(id)) {
                    throw new BusinessValidationException(
                            "Phone number " + farmer.getPhoneNumber() + " is already used by another farmer.");
                }
            });
        }

        existing.setFullName(farmer.getFullName());
        existing.setPhoneNumber(farmer.getPhoneNumber());
        existing.setFarmLocation(farmer.getFarmLocation());
        return farmerRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        Farmer existing = findById(id);
        if (existing.getAnimals() != null && !existing.getAnimals().isEmpty()) {
            // Business rule: a farmer who still owns animals cannot be deleted outright
            throw new BusinessValidationException(
                    "Cannot delete farmer " + id + ": they still own " + existing.getAnimals().size()
                            + " registered animal(s). Reassign or remove those animals first.");
        }
        farmerRepository.deleteById(id);
    }
}
