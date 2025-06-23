# Security Microservices Overview

This directory contains the security-related microservices for the Proyecto Octavo platform. Each service is responsible for a specific aspect of user security, such as encryption, decryption, and JWT-based authentication. All services are containerized for easy deployment and integration.

---

## Folder Structure

```
Back/Security/
│
├── Encrypt/
├── Decrypt/
└── Jwt/
```

---

## Folder Summaries

### 1. Encrypt

**Purpose:**  
Provides a SOAP-based microservice for encrypting sensitive user data (such as phone numbers and passwords) using the AES-256-CFB algorithm.

**Key Features:**
- Written in Go, implements the Command pattern for extensibility.
- Exposes a SOAP endpoint that accepts XML requests and returns encrypted data in XML.
- Uses AES-256-CFB with a 32-byte key and 16-byte IV (hardcoded for development).
- Base64 encodes the encrypted output.
- Includes Dockerfile and docker-compose for containerized deployment.

**Typical Usage:**  
Send a SOAP request with plain phone and password, receive encrypted values in the response.

---

### 2. Decrypt

**Purpose:**  
Provides a GraphQL-based microservice for decrypting data encrypted by the Encrypt service, using the AES-256-CFB algorithm.

**Key Features:**
- Written in Ruby, uses Sinatra and GraphQL.
- Implements the Decorator pattern for modular decryption and validation.
- Exposes a GraphQL mutation for decryption.
- Validates input and handles errors robustly.
- Uses AES-256-CFB with a 32-byte key and 16-byte IV (configurable via environment variables).
- Includes Dockerfile and docker-compose for containerized deployment.

**Typical Usage:**  
Send a GraphQL mutation with encrypted phone and password, receive decrypted values in the response.

---

### 3. Jwt

**Purpose:**  
Handles JSON Web Token (JWT) creation and verification for secure authentication and authorization.

**Key Features:**
- Written in Node.js with Express.
- Provides REST endpoints to create and verify JWT tokens.
- Tokens are signed with a secret key and have a 1-hour expiration.
- Supports CORS and cookie parsing.
- Includes automated tests with Jest and Supertest.
- Environment variables for configuration (port, secret key, allowed origins).
- Includes Dockerfile and docker-compose for containerized deployment.

**Typical Usage:**  
POST to `/Create_Jwt` with a user ID to receive a JWT, or POST to `/Verify_Jwt` with a token to validate it.

---

## General Notes

- All services are designed to be stateless and horizontally scalable.
- Each service follows a clear separation of concerns and uses design patterns (Command, Decorator) for maintainability.
- Security best practices are recommended for production (secure secrets, HTTPS, proper CORS, etc.).
- Each folder contains its own `README.md` with further details and usage instructions.

---
