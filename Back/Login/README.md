# Back/Login Microservices Overview

This directory contains the user authentication and management microservices for the Proyecto Octavo platform. Each folder represents a specialized service, following a modular and distributed architecture for scalability, maintainability, and security.

---

## Folder Summaries

### Create_User

**Purpose:**  
Handles the creation of new user accounts.

**Key Features:**
- Receives user creation requests via a Bull queue.
- Verifies JWT tokens for authentication.
- Validates verification codes using Redis.
- Encrypts sensitive user credentials (phone, password) before storage.
- Stores user data in a MySQL database.
- Sends real-time notifications via Socket.IO.
- Robust error handling for JWT, verification, encryption, and queue issues.
- Includes Jest-based unit tests and Docker support.

---

### Delete_User

**Purpose:**  
Manages the secure and asynchronous deletion of user accounts.

**Key Features:**
- Processes deletion requests through a queue.
- Verifies user identity and JWT tokens.
- Removes user data from the database.
- Notifies users of operation results.
- Error handling for authentication and database operations.
- Dockerized and includes automated tests.

---

### Mysql_Structure

**Purpose:**  
Manages MySQL database connections and structure verification.

**Key Features:**
- Provides endpoints for checking database connectivity and structure.
- Handles HTTP errors and CORS.
- Configurable via environment variables.
- Includes a test mode for development.
- Dockerized for easy deployment.

---

### Password_Recovery

**Purpose:**  
Handles password recovery workflows for users.

**Key Features:**
- Receives recovery requests and processes them asynchronously.
- Verifies JWT tokens and securely decrypts sensitive data.
- Integrates with external services (e.g., Twilio for WhatsApp/SMS notifications).
- Uses Redis for temporary data storage.
- Robust error handling and notification system.
- Modular service structure and Docker support.

---

### Read_User

**Purpose:**  
Retrieves user profile information securely.

**Key Features:**
- Processes read requests via a queue.
- Verifies JWT tokens for authentication.
- Fetches user data from the database.
- Decrypts sensitive information before responding.
- Maps user data for consistent API responses.
- Notifies users of results via Socket.IO.
- Includes error handling, unit tests, and Docker support.

---

### Update_User

**Purpose:**  
Manages secure and asynchronous updates to user information.

**Key Features:**
- Processes update requests through a Bull queue.
- Verifies JWT tokens and encrypts updated credentials.
- Updates user data in the database.
- Sends real-time notifications of operation results.
- Handles errors for authentication, encryption, and queue processing.
- Dockerized and includes automated tests.

---

### Verification

**Purpose:**  
Handles user verification processes (such as email or phone verification).

**Key Features:**
- Generates and validates verification codes.
- Integrates with notification services for code delivery.
- Uses Redis for temporary code storage.
- Error handling for invalid or expired codes.
- Docker support.

---

### Verify_User

**Purpose:**  
Verifies user credentials and account status.

**Key Features:**
- Processes verification requests.
- Checks user credentials against the database.
- Integrates with JWT and encryption services.
- Notifies users of verification results.
- Error handling and Docker support.

---

### Whatsapp

**Purpose:**  
Handles WhatsApp-based notifications and communications.

**Key Features:**
- Integrates with Twilio and Socket.IO for real-time messaging.
- Supports sending verification codes and notifications via WhatsApp.
- Manages connections and message delivery.
- Written in .NET for robust messaging support.
- Dockerized for deployment.

---

## General Notes

- All services are designed to be stateless, modular, and horizontally scalable.
- Each service uses environment variables for configuration and sensitive data.
- Security best practices are followed, including JWT authentication, encryption, and secure error handling.
- Each folder contains its own `README.md` with further details and usage instructions.

---
