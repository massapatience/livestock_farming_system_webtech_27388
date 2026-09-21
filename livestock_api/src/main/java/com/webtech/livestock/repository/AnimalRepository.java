package com.webtech.livestock.repository;

import com.webtech.livestock.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    Optional<Animal> findByTagNumber(String tagNumber);
    List<Animal> findByFarmerId(Long farmerId);
}
