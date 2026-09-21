package com.webtech.livestock.controller;

import com.webtech.livestock.model.Animal;
import com.webtech.livestock.service.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    // Example: POST /api/animals?farmerId=1
    @PostMapping
    public ResponseEntity<Animal> create(@Valid @RequestBody Animal animal,
                                          @RequestParam Long farmerId) {
        Animal saved = animalService.create(animal, farmerId);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Animal>> findAll() {
        return ResponseEntity.ok(animalService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> findById(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> update(@PathVariable Long id, @Valid @RequestBody Animal animal) {
        return ResponseEntity.ok(animalService.update(id, animal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        animalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
