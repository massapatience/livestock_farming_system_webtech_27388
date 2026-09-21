package com.webtech.livestock.service;

import com.webtech.livestock.model.Animal;

import java.util.List;

public interface AnimalService {
    Animal create(Animal animal, Long farmerId);
    List<Animal> findAll();
    Animal findById(Long id);
    Animal update(Long id, Animal animal);
    void delete(Long id);
}
