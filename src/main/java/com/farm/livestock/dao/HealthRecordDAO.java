package com.farm.livestock.dao;

import com.farm.livestock.model.Animal;
import com.farm.livestock.model.HealthRecord;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class HealthRecordDAO {

    public void save(HealthRecord record) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.saveOrUpdate(record);
            tx.commit();
        } catch (RuntimeException e) {
            if (tx != null) {
                tx.rollback();
            }
            throw e;
        }
    }

    public void delete(Long id) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            HealthRecord record = session.get(HealthRecord.class, id);
            if (record != null) {
                session.delete(record);
            }
            tx.commit();
        } catch (RuntimeException e) {
            if (tx != null) {
                tx.rollback();
            }
            throw e;
        }
    }

    public HealthRecord findById(Long id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.get(HealthRecord.class, id);
        }
    }

    @SuppressWarnings("unchecked")
    public List<HealthRecord> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM HealthRecord ORDER BY id DESC").list();
        }
    }

    @SuppressWarnings("unchecked")
    public List<Animal> loadAnimalsForDropdown() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM Animal ORDER BY tagNumber").list();
        }
    }
}
