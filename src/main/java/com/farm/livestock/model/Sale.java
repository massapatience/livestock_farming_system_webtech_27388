package com.farm.livestock.model;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "sales")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Buyer name is required")
    @Column(name = "buyer_name", nullable = false)
    private String buyerName;

    @NotNull(message = "Sale date is required")
    @Column(name = "sale_date", nullable = false)
    private LocalDate saleDate;

    @NotNull(message = "Sale price is required")
    @DecimalMin(value = "1", message = "Sale price must be greater than 0")
    @Column(name = "sale_price_rwf", nullable = false)
    private Double salePriceRwf;

    @OneToOne
    @JoinColumn(name = "animal_id", nullable = false, unique = true)
    private Animal animal;

    public Sale() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public LocalDate getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDate saleDate) {
        this.saleDate = saleDate;
    }

    public Double getSalePriceRwf() {
        return salePriceRwf;
    }

    public void setSalePriceRwf(Double salePriceRwf) {
        this.salePriceRwf = salePriceRwf;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}
