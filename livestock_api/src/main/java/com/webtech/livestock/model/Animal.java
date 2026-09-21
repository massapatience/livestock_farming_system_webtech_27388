package com.webtech.livestock.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "animals")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tag number is required")
    @Size(max = 20, message = "Tag number must be 20 characters or fewer")
    @Column(name = "tag_number", nullable = false, unique = true)
    private String tagNumber;

    @NotBlank(message = "Species is required")
    @Column(name = "species", nullable = false)
    private String species;

    @NotBlank(message = "Breed is required")
    @Column(name = "breed", nullable = false)
    private String breed;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "0.1", message = "Weight must be greater than 0")
    @Column(name = "weight_kg", nullable = false)
    private Double weightKg;

    @NotBlank(message = "Health status is required")
    @Column(name = "health_status", nullable = false)
    private String healthStatus;

    @NotNull(message = "farmerId is required")
    @ManyToOne
    @JoinColumn(name = "farmer_id", nullable = false)
    @JsonIgnoreProperties("animals")
    private Farmer farmer;

    @JsonIgnore
    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HealthRecord> healthRecords;

    public Animal() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTagNumber() {
        return tagNumber;
    }

    public void setTagNumber(String tagNumber) {
        this.tagNumber = tagNumber;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(Double weightKg) {
        this.weightKg = weightKg;
    }

    public String getHealthStatus() {
        return healthStatus;
    }

    public void setHealthStatus(String healthStatus) {
        this.healthStatus = healthStatus;
    }

    public Farmer getFarmer() {
        return farmer;
    }

    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }

    public List<HealthRecord> getHealthRecords() {
        return healthRecords;
    }

    public void setHealthRecords(List<HealthRecord> healthRecords) {
        this.healthRecords = healthRecords;
    }
}
