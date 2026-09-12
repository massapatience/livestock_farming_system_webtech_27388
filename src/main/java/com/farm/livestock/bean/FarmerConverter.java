package com.farm.livestock.bean;

import com.farm.livestock.dao.FarmerDAO;
import com.farm.livestock.model.Farmer;

import javax.faces.bean.ManagedBean;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

@FacesConverter("farmerConverter")
@ManagedBean(name = "farmerConverter")
public class FarmerConverter implements Converter {

    private final FarmerDAO farmerDAO = new FarmerDAO();

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        Long id = Long.valueOf(value);
        return farmerDAO.findAll().stream()
                .filter(f -> f.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        if (value == null) {
            return "";
        }
        return String.valueOf(((Farmer) value).getId());
    }
}
