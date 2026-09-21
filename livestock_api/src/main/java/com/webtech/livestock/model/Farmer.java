package com.webtech.livestock.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "farmers")
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 80, message = "Full name must be between 3 and 80 characters")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^(\\+250|0)7[0-9]{8}$", message = "Enter a valid Rwandan phone number")
    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @NotBlank(message = "Farm location is required")
    @Column(name = "farm_location", nullable = false)
    private String farmLocation;

    @JsonIgnore
    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Animal> animals;

    public Farmer() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFarmLocation() {
        return farmLocation;
    }

    public void setFarmLocation(String farmLocation) {
        this.farmLocation = farmLocation;
    }

    public List<Animal> getAnimals() {
        return animals;
    }

    public void setAnimals(List<Animal> animals) {
        this.animals = animals;
    }
}
