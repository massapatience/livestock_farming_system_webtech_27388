package com.webtech.livestock.controller;

import com.webtech.livestock.model.HealthRecord;
import com.webtech.livestock.service.HealthRecordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/health-records")
public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    public HealthRecordController(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    // Example: POST /api/health-records?animalId=1
    @PostMapping
    public ResponseEntity<HealthRecord> create(@Valid @RequestBody HealthRecord record,
                                                @RequestParam Long animalId) {
        HealthRecord saved = healthRecordService.create(record, animalId);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<HealthRecord>> findAll() {
        return ResponseEntity.ok(healthRecordService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HealthRecord> findById(@PathVariable Long id) {
        return ResponseEntity.ok(healthRecordService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HealthRecord> update(@PathVariable Long id, @Valid @RequestBody HealthRecord record) {
        return ResponseEntity.ok(healthRecordService.update(id, record));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        healthRecordService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
