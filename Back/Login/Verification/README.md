# Verification Service

This service is part of a distributed system that manages user verification using Apache Kafka and Bull queues for efficient and secure asynchronous processing.

## Verification Job Flow

```mermaid
flowchart TD
    %% Start of flow
    A[User submits verification job to Bull queue Verification] --> B[server.js Queue processor]

    %% Queue processing
    B --> C[JWTService verify Token]
    C -- Invalid Token --> D[NotificationService sendNotification Id false Session expired Please log in again]
    C -- Valid Token --> E[VerificationService processVerification job.data]

    %% Verification logic
    E --> F[connectToDB query CALL ReadRecord(Id)]
    F --> G{User exists in DB?}
    G -- Yes --> H[NotificationService sendNotification Id false User exists]
    G -- No --> I[KafkaService sendMessage {Id, Phone}]

    %% General error handling
    E -->|Exception| J[NotificationService sendNotification Id false Error processing job]

    %% User communication
    D -.-> K[Socket.IO Notification]
    H -.-> K
    J -.-> K

    %% Initialization and setup
    L[server.js loads .env, sets up Express]
    L --> M[Test_Connection Controllers/test_connection.js]
    L --> N[KafkaService createTopicIfNotExists TOPIC]
    L --> O[Queue Verification setup with redisConfig]

    %% Legend
    subgraph Legend
        direction LR
        L1[server.js: Main entry, queue processing, Kafka topic setup]
        L2[Services/jwt.service.js: JWTService, token validation (external API)]
        L3[Services/verification.service.js: VerificationService, DB check and Kafka integration]
        L4[Services/notification.service.js: NotificationService, sends Socket.IO notifications]
        L5[Services/kafka.service.js: KafkaService, topic management and messaging]
        L6[Config/redis.config.js: Redis config for Bull queue]
        L7[Config/kafka.config.js: Kafka config]
        L8[Database/connect.js: MySQL connection pool]
        L9[Controllers/test_connection.js: DB connection test]
    end

```

## Features

- Asynchronous verification processing using Bull queues  
- Integration with Apache Kafka for distributed messaging  
- JWT token validation to ensure security  
- Real-time notification system for user feedback  
- Integration with Redis for efficient queue management

## Technologies Used

- **Node.js**  
- **Express.js**  
- **Apache Kafka**  
- **Bull** (for processing queues)  
- **Redis**  
- **JWT** (JSON Web Tokens)

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
PORT=<service_port>
# Other required variables for Kafka and Redis, for example:
KAFKA_BROKER=<host:port>
KAFKA_CLIENT_ID=<kafka_client_id>
REDIS_HOST=<redis_host>
REDIS_PORT=<redis_port>
JWT_SECRET=<jwt_secret_key>
Installation
npm install
Execution
npm start
Workflow
1.	Initialization of the Kafka topic if it does not exist
2.	Reception of verification requests via a Bull queue
3.	JWT token validation
4.	Verification processing
5.	Sending notifications about the result of the process
Project Structure
├── Config/
│   ├── kafka.config.js         # Kafka configuration
│   └── redis.config.js         # Redis configuration
├── Controllers/
│   └── test_connection.js      # Connection test
├── Database/
│   └── connect.js              # Database connection
├── Services/
│   ├── jwt.service.js          # JWT authentication service
│   ├── kafka.service.js        # Kafka service
│   ├── notification.service.js # Notification service
│   └── verification.service.js # Verification logic
├── .env                        # Environment variables
└── server.js                   # Main entry point
Error Handling
The service properly handles the following errors:
•	Invalid or expired JWT tokens
•	Errors in communication with Apache Kafka
•	Failures during the verification process
Each error is promptly reported through the notification system.
Docker
The service is containerized and can be run with Docker:
docker-compose up
Testing
To run tests:
npm test
Kafka Integration
The service uses Apache Kafka for asynchronous communication between services.
During initialization, it checks for the existence of the corresponding topic and creates it automatically if it does not exist.
Security
•	JWT token validation in all operations
•	Secure communication via Kafka
•	Confidential handling of sensitive data
