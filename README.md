# Livestock Farming Management System

**Student:** Bakwiye Massa Patience
**Student ID:** 27388
**Course:** Web Technologies
**Project:** Livestock Farming Management System (JSF + Hibernate CRUD)

## About

A CRUD web application for tracking a livestock farm's operations:
- **Farmers** who own animals
- **Animals** (cattle, goats, sheep, pigs, poultry) with tag numbers, breed, weight, and health status
- **Health Records** — veterinary visits, diagnoses, and treatments per animal
- **Feeding Records** — daily feed type and quantity per animal
- **Sales** — buyer and price when an animal is sold

Full CRUD screens are implemented for **Animals** and **Health Records**; Farmer,
Feeding Record, and Sale are modeled as JPA entities and appear in the class
diagram, per the assignment scope.

## Tech Stack

- Java 11, JSF 2.3 (Mojarra)
- Hibernate ORM 5.6 (JPA annotations, `hbm2ddl.auto=update`)
- MySQL 8
- Bean Validation (JSR-380 / Hibernate Validator) + HTML5 + JavaScript validation

## Setup

1. Create a MySQL database:
   ```sql
   CREATE DATABASE livestock_farming_db;
   ```
2. Update credentials in `src/main/resources/hibernate.cfg.xml` if needed
   (defaults to `root` / `root`).
3. Build and deploy:
   ```bash
   mvn clean package
   ```
   Deploy the resulting `livestock-farming-management.war` to Tomcat/GlassFish/Payara.
4. Visit `http://localhost:8080/livestock-farming-management/`.

## Project Structure

```
src/main/java/com/farm/livestock/
  model/   Farmer, Animal, HealthRecord, FeedingRecord, Sale (JPA entities)
  dao/     HibernateUtil, FarmerDAO, AnimalDAO, HealthRecordDAO
  bean/    AnimalBean, HealthRecordBean, FarmerConverter, AnimalConverter
src/main/webapp/
  index.xhtml
  animals/  animalList.xhtml, animalForm.xhtml
  health/   healthList.xhtml, healthForm.xhtml
  resources/css/style.css, resources/js/validation.js
```
