# User Verification Service

This service is part of a distributed system that manages user verification through asynchronous processing using Bull queues and secure decryption of sensitive data.

```mermaid
flowchart TD
    %% Inicio del flujo
    A[Job submitted to Bull queue Verify User with Id Password Token] --> B[server.js Queue processor]

    %% Proceso de la cola
    B --> C[JWTService verifyToken Token]
    C -- Invalid Token --> D[NotificationService sendNotification Id false Session expired Please log in again]
    C -- Valid Token --> E[VerificationService verifyUser with Id Password Token]

    %% Lógica de verificación
    E --> F[UserService findUserById Id]
    F --> G{User found?}
    G -- No --> H[NotificationService sendNotification Id false The user does not exist]
    G -- Yes --> I[DecryptionService decryptData Phone Password]
    I --> J{Decryption successful?}
    J -- No --> K[NotificationService sendNotification Id false Error decrypting your information]
    J -- Yes --> L{Decrypted password equals job Password?}
    L -- No --> M[NotificationService sendNotification Id false The password is incorrect]
    L -- Yes --> N[NotificationService sendNotification Id true The user exist]

    %% Manejo de errores generales
    E -->|Exception| O[NotificationService sendNotification Id false Error processing job]

    %% Comunicación con usuario
    D -.-> P[Socket IO Notification]
    H -.-> P
    K -.-> P
    M -.-> P
    N -.-> P
    O -.-> P

    %% Clases principales y archivos
    classDef service fill:#f9f,stroke:#333,stroke-width:2px;
    class B,C,E,F,I,D,H,K,M,N,O service;

    %% Leyenda
    subgraph Legend [Legend]
        direction LR
        L1[server.js Main entry Bull queue service orchestration]
        L2[Services jwt.service.js JWTService token validation calls external API]
        L3[Services verification.service.js VerificationService main verification logic]
        L4[Services user.service.js UserService fetches user from MySQL]
        L5[Services decryption.service.js DecryptionService decrypts credentials via GraphQL]
        L6[Services notification.service.js NotificationService sends Socket IO notifications]
        L7[Config redis.config.js Redis config for Bull queue]
        L8[Database connect.js MySQL connection pool]
    end

```

## Features

- Asynchronous verification processing via Bull  
- JWT token validation to ensure security  
- Real-time notification system for immediate feedback  
- Integration with Redis for efficient queue management  
- Secure decryption of sensitive user data

## Technologies Used

- **Node.js**  
- **Express.js**  
- **Bull** (for queue processing)  
- **Redis**  
- **JWT** (JSON Web Tokens)

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
PORT=<service_port>
# Additional required variables for Redis and external services
REDIS_HOST=<redis_host>
REDIS_PORT=<redis_port>
JWT_SECRET=<jwt_secret_key>
ENCRYPTION_SERVICE_URL=<decryption_service_url>
Installation
npm install
Execution
npm start
Workflow
1.	Reception of verification requests through a Bull queue
2.	JWT token validation to authenticate the user
3.	Decryption of the user's sensitive data
4.	Verification of the user's information
5.	Real-time notifications sent with the process result
Project Structure
├── Config/
│   └── redis.config.js         # Redis configuration
├── Controllers/
│   └── test_connection.js      # Connection testing
├── Database/
│   └── connect.js              # Database connection
├── Services/
│   ├── decryption.service.js   # Decryption service
│   ├── jwt.service.js          # JWT management service
│   ├── notification.service.js # Notification service
│   ├── user.service.js         # User logic service
│   └── verification.service.js # Verification logic
├── .env                        # Environment variables
└── server.js                   # Main entry point
Error Handling
The service handles the following error cases:
•	Invalid or expired JWT tokens
•	Failures in data decryption
•	Errors in user information verification
•	Communication issues with external services
Each error is communicated to the user through the notification system.
Docker
The service is containerized and can be run with Docker:
docker-compose up
Testing
To run the tests:
npm test
Security
•	JWT validation for all requests
•	Secure decryption of sensitive data
•	Responsible and safe handling of user information
•	Real-time notifications about the verification process status
