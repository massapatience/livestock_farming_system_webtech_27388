package com.farm.livestock.model;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "health_records")
public class HealthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Visit date is required")
    @PastOrPresent(message = "Visit date cannot be in the future")
    @Column(name = "visit_date", nullable = false)
    private LocalDate visitDate;

    @NotBlank(message = "Diagnosis or reason for visit is required")
    @Column(name = "diagnosis", nullable = false)
    private String diagnosis;

    @NotBlank(message = "Treatment given is required")
    @Column(name = "treatment", nullable = false)
    private String treatment;

    @NotBlank(message = "Veterinarian name is required")
    @Column(name = "veterinarian", nullable = false)
    private String veterinarian;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    private Animal animal;

    public HealthRecord() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public String getVeterinarian() {
        return veterinarian;
    }

    public void setVeterinarian(String veterinarian) {
        this.veterinarian = veterinarian;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}
