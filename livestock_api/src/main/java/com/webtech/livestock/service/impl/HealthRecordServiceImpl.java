package com.webtech.livestock.service.impl;

import com.webtech.livestock.exception.BusinessValidationException;
import com.webtech.livestock.exception.ResourceNotFoundException;
import com.webtech.livestock.model.Animal;
import com.webtech.livestock.model.HealthRecord;
import com.webtech.livestock.repository.AnimalRepository;
import com.webtech.livestock.repository.HealthRecordRepository;
import com.webtech.livestock.service.HealthRecordService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthRecordServiceImpl implements HealthRecordService {

    private final HealthRecordRepository healthRecordRepository;
    private final AnimalRepository animalRepository;

    public HealthRecordServiceImpl(HealthRecordRepository healthRecordRepository,
                                    AnimalRepository animalRepository) {
        this.healthRecordRepository = healthRecordRepository;
        this.animalRepository = animalRepository;
    }

    @Override
    public HealthRecord create(HealthRecord record, Long animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id " + animalId));

        validateVisitDate(record, animal);

        record.setAnimal(animal);
        return healthRecordRepository.save(record);
    }

    @Override
    public List<HealthRecord> findAll() {
        return healthRecordRepository.findAll();
    }

    @Override
    public HealthRecord findById(Long id) {
        return healthRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Health record not found with id " + id));
    }

    @Override
    public HealthRecord update(Long id, HealthRecord record) {
        HealthRecord existing = findById(id);
        validateVisitDate(record, existing.getAnimal());

        existing.setVisitDate(record.getVisitDate());
        existing.setDiagnosis(record.getDiagnosis());
        existing.setTreatment(record.getTreatment());
        existing.setVeterinarian(record.getVeterinarian());
        return healthRecordRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        findById(id); // 404s cleanly if it doesn't exist
        healthRecordRepository.deleteById(id);
    }

    private void validateVisitDate(HealthRecord record, Animal animal) {
        // Business rule: a health visit cannot be dated before the animal was born
        if (record.getVisitDate() != null && animal.getDateOfBirth() != null
                && record.getVisitDate().isBefore(animal.getDateOfBirth())) {
            throw new BusinessValidationException(
                    "Visit date " + record.getVisitDate() + " is before this animal's date of birth ("
                            + animal.getDateOfBirth() + ").");
        }
    }
}
