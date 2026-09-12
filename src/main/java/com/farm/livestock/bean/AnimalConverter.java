package com.farm.livestock.bean;

import com.farm.livestock.dao.AnimalDAO;
import com.farm.livestock.model.Animal;

import javax.faces.bean.ManagedBean;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

@FacesConverter("animalConverter")
@ManagedBean(name = "animalConverter")
public class AnimalConverter implements Converter {

    private final AnimalDAO animalDAO = new AnimalDAO();

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        return animalDAO.findById(Long.valueOf(value));
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        if (value == null) {
            return "";
        }
        return String.valueOf(((Animal) value).getId());
    }
}
