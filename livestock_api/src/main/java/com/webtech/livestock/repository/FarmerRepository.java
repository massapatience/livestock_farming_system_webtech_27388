package com.webtech.livestock.repository;

import com.webtech.livestock.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    Optional<Farmer> findByPhoneNumber(String phoneNumber);
}
