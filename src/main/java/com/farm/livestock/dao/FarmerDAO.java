package com.farm.livestock.dao;

import com.farm.livestock.model.Farmer;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class FarmerDAO {

    public void save(Farmer farmer) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.saveOrUpdate(farmer);
            tx.commit();
        } catch (RuntimeException e) {
            if (tx != null) {
                tx.rollback();
            }
            throw e;
        }
    }

    @SuppressWarnings("unchecked")
    public List<Farmer> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM Farmer ORDER BY fullName").list();
        }
    }
}
