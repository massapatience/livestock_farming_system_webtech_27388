package com.farm.livestock.bean;

import com.farm.livestock.dao.HealthRecordDAO;
import com.farm.livestock.model.Animal;
import com.farm.livestock.model.HealthRecord;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.List;

@ManagedBean(name = "healthRecordBean")
@SessionScoped
public class HealthRecordBean implements Serializable {

    private static final long serialVersionUID = 1L;

    private final HealthRecordDAO healthRecordDAO = new HealthRecordDAO();

    private HealthRecord healthRecord = new HealthRecord();
    private List<HealthRecord> healthRecordList;
    private List<Animal> animalOptions;

    public String save() {
        healthRecordDAO.save(healthRecord);
        healthRecord = new HealthRecord();
        loadHealthRecords();
        return "healthList?faces-redirect=true";
    }

    public String edit(Long id) {
        healthRecord = healthRecordDAO.findById(id);
        return "healthForm?faces-redirect=true";
    }

    public String delete(Long id) {
        healthRecordDAO.delete(id);
        loadHealthRecords();
        return "healthList?faces-redirect=true";
    }

    public String newHealthRecord() {
        healthRecord = new HealthRecord();
        return "healthForm?faces-redirect=true";
    }

    public void loadHealthRecords() {
        healthRecordList = healthRecordDAO.findAll();
    }

    public void loadAnimalOptions() {
        animalOptions = healthRecordDAO.loadAnimalsForDropdown();
    }

    public List<HealthRecord> getHealthRecordList() {
        if (healthRecordList == null) {
            loadHealthRecords();
        }
        return healthRecordList;
    }

    public List<Animal> getAnimalOptions() {
        if (animalOptions == null) {
            loadAnimalOptions();
        }
        return animalOptions;
    }

    public HealthRecord getHealthRecord() {
        return healthRecord;
    }

    public void setHealthRecord(HealthRecord healthRecord) {
        this.healthRecord = healthRecord;
    }
}
