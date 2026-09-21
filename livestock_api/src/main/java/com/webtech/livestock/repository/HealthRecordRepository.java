package com.webtech.livestock.repository;

import com.webtech.livestock.model.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
    List<HealthRecord> findByAnimalId(Long animalId);
}
