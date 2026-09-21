# Livestock Farming Management API

**Student:** Bakwiye Massa Patience
**Student ID:** 27388
**Assignment:** Assignment 4 — Spring Boot REST API + Postman

## About

A Spring Boot RESTful API implementing full CRUD for 3 entities from the Livestock
Farming Management System: **Farmer**, **Animal**, and **HealthRecord**. Beyond
field-level bean validation (`@NotBlank`, `@DecimalMin`, `@Past`, etc.), the service
layer enforces business rules that a simple annotation can't express — see
"Business Logic Validation" below.

## Tech Stack

- Java 11, Spring Boot 2.7 (Web, Data JPA, Validation)
- MySQL 8
- Tested with Postman (`postman_collection.json` included)

## Setup

1. Ensure MySQL is running; the database `livestock_farming_db` is created
   automatically on startup (`createDatabaseIfNotExist=true` in
   `application.properties`). Update the username/password there if needed
   (defaults to `root` / `root`).
2. Run:
   ```bash
   mvn spring-boot:run
   ```
3. The API listens on `http://localhost:8081`.
4. Import `postman_collection.json` into Postman and run the requests in order
   (Create Farmer → Create Animal → Create Health Record → ... ) since Animal and
   HealthRecord creation need an existing parent id.

## Endpoints

| Entity | Method | URL | Notes |
|---|---|---|---|
| Farmer | POST | `/api/farmers` | Create |
| Farmer | GET | `/api/farmers` | List all |
| Farmer | GET | `/api/farmers/{id}` | Get one |
| Farmer | PUT | `/api/farmers/{id}` | Update |
| Farmer | DELETE | `/api/farmers/{id}` | Delete (blocked if they own animals) |
| Animal | POST | `/api/animals?farmerId={id}` | Create, linked to a farmer |
| Animal | GET | `/api/animals` | List all |
| Animal | GET | `/api/animals/{id}` | Get one |
| Animal | PUT | `/api/animals/{id}` | Update |
| Animal | DELETE | `/api/animals/{id}` | Delete (blocked if it has health records) |
| HealthRecord | POST | `/api/health-records?animalId={id}` | Create, linked to an animal |
| HealthRecord | GET | `/api/health-records` | List all |
| HealthRecord | GET | `/api/health-records/{id}` | Get one |
| HealthRecord | PUT | `/api/health-records/{id}` | Update |
| HealthRecord | DELETE | `/api/health-records/{id}` | Delete |

## Business Logic Validation (beyond field-level bean validation)

- A farmer's phone number must be unique across all farmers.
- An animal's tag number must be unique across all animals.
- Animal `species` must be one of a fixed list (Cattle, Goat, Sheep, Pig, Poultry).
- Animal `healthStatus` must be one of a fixed list (Healthy, Under Treatment, Sick, Quarantined).
- An animal's weight is rejected if it exceeds 1500 kg (sanity check on live-animal weight).
- A health record's visit date cannot be earlier than the animal's date of birth.
- A farmer who still owns animals cannot be deleted.
- An animal that still has health records cannot be deleted.

All business-rule violations return HTTP `422 Unprocessable Entity` with a JSON body
explaining the rule; missing parents return `404 Not Found`; field-level validation
failures return `400 Bad Request` with a per-field error map.
