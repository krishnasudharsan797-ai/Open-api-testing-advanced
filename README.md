# Open Banking Advanced API Testing Project

## Project Overview

This project is a **Node.js + Express-based Open Banking API simulation** designed to demonstrate real-world **Manual QA Engineering** and **API Testing** practices.

The project simulates important banking workflows such as:

- Customer authentication
- Account creation and retrieval
- Consent management
- Payment lifecycle (Initiate → Authorize → Execute)
- Payee verification
- Account aggregation
- Role-Based Access Control (RBAC)
- Audit logging
- Validation and negative testing
- Automated API assertions using Postman

This project was built to showcase **manual testing engineer skills** using **Postman**, **API validation**, and **real QA documentation practices**.

---

# Features

## 1. Authentication Module

Supports basic login validation.

### Endpoints
- `POST /api/auth/login`

### Test Coverage
- Valid login
- Invalid credentials
- Missing username
- Missing password

---

## 2. Account Management

Allows account creation and retrieval.

### Endpoints
- `POST /api/accounts/create`
- `GET /api/accounts`
- `GET /api/accounts/:id`

### Features
- Create bank accounts
- Validate required fields
- Retrieve all accounts
- Retrieve account by ID

### Test Coverage
- Successful account creation
- Missing customerId
- Missing bankId
- Negative balance validation
- Invalid account ID

---

## 3. Consent Management

Simulates Open Banking customer consent flow.

### Endpoints
- `POST /api/consents/create`
- `POST /api/consents/:id/approve`
- `POST /api/consents/:id/revoke`
- `GET /api/consents/:id`

### Features
- Create consent
- Approve consent
- Revoke consent
- Consent status tracking

### Test Coverage
- Valid consent lifecycle
- Invalid consent ID
- Missing customerId
- Revoked consent handling

---

## 4. Payment Lifecycle

Implements complete payment processing.

### Endpoints
- `POST /api/payments/initiate`
- `POST /api/payments/:id/authorize`
- `POST /api/payments/:id/execute`

### Payment States
- INITIATED
- AUTHORIZED
- COMPLETED

### Features
- Payment initiation
- Authorization
- Execution
- Duplicate execution prevention
- State validation
- Payee verification dependency

### Test Coverage
- Successful payment flow
- Execute without authorization
- Duplicate execution
- Invalid payment ID
- Payee not verified

---

## 5. Payee Verification

Simulates Confirmation of Payee behavior.

### Endpoints
- `POST /api/payee/verify`

### Matching Logic
- MATCH
- PARTIAL_MATCH
- NO_MATCH

### Test Coverage
- Exact match
- Partial match
- No match
- Missing accountHolderName

---

## 6. Account Aggregation

Simulates third-party provider (TPP) account access.

### Endpoint
- `GET /api/accounts/aggregated/accounts`

### Query Parameters
- `customerId`
- `consentId`

### Features
- Consent validation
- Ownership validation
- Aggregated multi-bank accounts

### Test Coverage
- Successful aggregation
- Missing customerId
- Missing consentId
- Invalid consent
- Revoked consent
- Wrong customer
- No accounts found

---

## 7. Role-Based Access Control (RBAC)

Restricts sensitive endpoints based on user roles.

### Roles
- CUSTOMER
- ADMIN
- TPP

### Protected Areas
- Audit access
- Aggregation access

### Test Coverage
- Authorized access
- Unauthorized access
- Missing headers
- Role validation

---

## 8. Audit Logging

Tracks important system events.

### Endpoint
- `GET /api/audit`

### Logged Events
- Consent creation
- Consent approval
- Consent revocation
- Payment initiation
- Payment authorization
- Payment execution
- Failed executions
- Payee verification

---

## 9. Validation & Negative Testing

Strong validation added across all APIs.

### Covered Validations
- Missing required fields
- Invalid data types
- Negative values
- Invalid states
- Duplicate operations
- Invalid IDs

---

## 10. Postman Automation Scripts

Automated assertions built inside Postman.

### Automation Features
- Status code validation
- Response body validation
- Variable storage
- Request chaining
- Collection runner execution

### Automated Flow
1. Initiate Payment
2. Authorize Payment
3. Execute Payment

---

# Technology Stack

## Backend
- Node.js
- Express.js

## Testing Tools
- Postman
- Postman Collection Runner

## Version Control
- Git
- GitHub

## Deployment
- Render

---

# Project Structure

```bash
open-bankings-advanced/
│
├── routes/
├── data/
├── middleware/
├── postman/
│   ├── open-banking-live.postman_collection.json
│   └── qa-live-environment.postman_environment.json
├── test-cases/
│   └── TestCases.xlsx
├── package.json
├── README.md
└── app.js
```

---

# Running Locally

## Install dependencies

```bash
npm install
```

## Start server

```bash
npm start
```

Server runs on:

```bash
http://localhost:3000
```

---

# Live Deployment

Deployed on Render:

```text
Add your Render deployment URL here
```

Example:

```text
https://open-bankings-advanced.onrender.com
```

---

# Postman Collection

Import:

```bash
postman/open-banking-live.postman_collection.json
```

Environment:

```bash
postman/qa-live-environment.postman_environment.json
```

---

# QA Testing Coverage

This project demonstrates:

- Manual API Testing
- Positive Testing
- Negative Testing
- Validation Testing
- Security Testing
- RBAC Testing
- Consent Workflow Testing
- Payment Lifecycle Testing
- Audit Verification
- API Automation Scripts
- Collection Runner Execution

---

# Purpose

This project was created to showcase practical skills for a **Manual Testing Engineer (QA)** role.

It demonstrates how a QA engineer can:

- Understand API workflows
- Design test scenarios
- Execute manual API testing
- Validate business rules
- Perform negative testing
- Use Postman professionally
- Build reusable API collections
- Create automated assertions
- Organize test documentation

---

# Author

Your Name Here

GitHub: Your GitHub Profile Link