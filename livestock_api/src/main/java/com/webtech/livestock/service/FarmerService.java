package com.webtech.livestock.service;

import com.webtech.livestock.model.Farmer;

import java.util.List;

public interface FarmerService {
    Farmer create(Farmer farmer);
    List<Farmer> findAll();
    Farmer findById(Long id);
    Farmer update(Long id, Farmer farmer);
    void delete(Long id);
}
