package com.webtech.livestock.service;

import com.webtech.livestock.model.HealthRecord;

import java.util.List;

public interface HealthRecordService {
    HealthRecord create(HealthRecord record, Long animalId);
    List<HealthRecord> findAll();
    HealthRecord findById(Long id);
    HealthRecord update(Long id, HealthRecord record);
    void delete(Long id);
}
