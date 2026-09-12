package com.farm.livestock.bean;

import com.farm.livestock.dao.AnimalDAO;
import com.farm.livestock.dao.FarmerDAO;
import com.farm.livestock.model.Animal;
import com.farm.livestock.model.Farmer;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.List;

@ManagedBean(name = "animalBean")
@SessionScoped
public class AnimalBean implements Serializable {

    private static final long serialVersionUID = 1L;

    private final AnimalDAO animalDAO = new AnimalDAO();
    private final FarmerDAO farmerDAO = new FarmerDAO();

    private Animal animal = new Animal();
    private List<Animal> animalList;
    private List<Farmer> farmerList;

    public String save() {
        animalDAO.save(animal);
        animal = new Animal();
        loadAnimals();
        return "animalList?faces-redirect=true";
    }

    public String edit(Long id) {
        animal = animalDAO.findById(id);
        return "animalForm?faces-redirect=true";
    }

    public String delete(Long id) {
        animalDAO.delete(id);
        loadAnimals();
        return "animalList?faces-redirect=true";
    }

    public String newAnimal() {
        animal = new Animal();
        return "animalForm?faces-redirect=true";
    }

    public void loadAnimals() {
        animalList = animalDAO.findAll();
    }

    public void loadFarmers() {
        farmerList = farmerDAO.findAll();
    }

    public List<Animal> getAnimalList() {
        if (animalList == null) {
            loadAnimals();
        }
        return animalList;
    }

    public List<Farmer> getFarmerList() {
        if (farmerList == null) {
            loadFarmers();
        }
        return farmerList;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}
