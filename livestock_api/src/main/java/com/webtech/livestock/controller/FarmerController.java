package com.webtech.livestock.controller;

import com.webtech.livestock.model.Farmer;
import com.webtech.livestock.service.FarmerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/farmers")
public class FarmerController {

    private final FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    @PostMapping
    public ResponseEntity<Farmer> create(@Valid @RequestBody Farmer farmer) {
        Farmer saved = farmerService.create(farmer);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Farmer>> findAll() {
        return ResponseEntity.ok(farmerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Farmer> findById(@PathVariable Long id) {
        return ResponseEntity.ok(farmerService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Farmer> update(@PathVariable Long id, @Valid @RequestBody Farmer farmer) {
        return ResponseEntity.ok(farmerService.update(id, farmer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        farmerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
