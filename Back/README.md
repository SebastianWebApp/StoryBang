## 🛠️ Backend Structure

The backend is organized into multiple business domains, each responsible for a specific part of the system's functionality. This modular structure improves maintainability and scalability.

### 📦 Main Domains

- **🧙 Character_Creator**: Manages character creation and customization.
- **🚀 Deployments**: Handles deployment-related operations and infrastructure setup.
- **🤖 Generator**: Core module responsible for generating content using AI (e.g., stories or images).
- **🔐 Login**: Handles user authentication and session management.
- **💬 Messages_User**: Manages notifications, messages, and user communication.
- **🎯 Orchestrator**: Coordinates interactions between different services and domains.
- **🛡️ Security**: Controls access, roles, and authorization.
- **📖 Story**: Responsible for story creation, editing, and storage.
- **🌍 Translator**: Provides language translation features for multilingual support.


## Process Flow (Mermaid)

```mermaid
flowchart TD
    A[User sends character request to Bull queue]
    A -->|Queue Bull| B[Character Service server.js]
    B --> C[Process_Queue listens for Character jobs]

    C --> D{Is token valid?}
    D -- No --> E[Notify: Session expired]
    D -- Yes --> F[UserService processes character request]

    F --> G[Mongo_Character create/read/delete]
    G --> H[MongoDB]

    F --> I[Notify: Operation completed successfully]
    C -->|Error| J[Notify: Error processing job]

    E -.-> K[Socket.IO Notification]
    I -.-> K
    J -.-> K
```

---

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> WaitingForJob
    WaitingForJob: Waiting for job in Bull queue

    WaitingForJob --> JobReceived: Job received Create Read Delete
    JobReceived --> JWTValidation: Validate JWT token
    JWTValidation -->|Invalid| NotifySessionExpired
    NotifySessionExpired: Notify user SocketIO Session expired
    NotifySessionExpired --> WaitingForJob

    JWTValidation -->|Valid| ProcessingJob

    state ProcessingJob {
        [*] --> CreateCharacter
        [*] --> ReadCharacter
        [*] --> DeleteCharacter

        CreateCharacter --> StoreCharacter: Store in MongoDB
        StoreCharacter --> NotifyCreated: Notify user created
        NotifyCreated --> [*]

        ReadCharacter --> QueryCharacter: Query MongoDB
        QueryCharacter --> NotifyRead: Notify user data
        NotifyRead --> [*]

        DeleteCharacter --> RemoveCharacter: Delete from MongoDB
        RemoveCharacter --> NotifyDeleted: Notify user deleted
        NotifyDeleted --> [*]
    }

    ProcessingJob --> WaitingForJob
    ProcessingJob -->|Error| NotifyError
    NotifyError: Notify user SocketIO Error processing job
    NotifyError --> WaitingForJob

```

---

## Use Case Diagram

```mermaid
graph TB
    User[User]
    Admin[Admin]
    CreateCharacter[Create Character]
    ReadCharacter[Read Character]
    DeleteCharacter[Delete Character]
    MonitorService[Monitor Service]
    AuthenticateViaJWT[Authenticate via JWT]

    User --> CreateCharacter
    User --> ReadCharacter
    User --> DeleteCharacter
    Admin --> MonitorService
    CreateCharacter -- include --> AuthenticateViaJWT
    ReadCharacter -- include --> AuthenticateViaJWT
    DeleteCharacter -- include --> AuthenticateViaJWT

```

---

## Main Classes & Components

- **server.js**: Entry point, sets up Express, Bull queue, and Socket.IO.
- **Services/**
  - `jwt.service.js`: JWT validation.
  - `user.service.js`: Character CRUD logic.
  - `notification.service.js`: Real-time notifications.
- **Config/**
  - `mongo.config.js`: MongoDB connection/model.
  - `redis.config.js`: Redis/Bull queue config.
- **Database**
  - MongoDB: Stores character documents.

---

## Example Request Flow

1. **User** submits a character creation request (with JWT) to the Bull queue.
2. **server.js** picks up the job, validates the JWT.
3. If valid, **user.service.js** processes the request (create/read/delete).
4. The result is stored or retrieved from **MongoDB**.
5. **notification.service.js** sends a real-time notification to the user via **Socket.IO**.
6. If any error occurs, the user is notified accordingly.

---

## Features

- Asynchronous, queue-based processing (Bull + Redis)
- JWT authentication for all operations
- MongoDB for persistent storage
- Real-time notifications via Socket.IO
- Modular, containerized microservices

---

## Example Environment Variables

```env
PORT=4016
PORT_MESSAGES_USERS=4003
MONGODB_URI=mongodb://localhost:27017/storybang
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_secret_key
```

---

## Summary

The Character Creator microservices provide a robust, scalable, and secure way to manage character data in the Proyecto Octavo platform, leveraging modern Node.js patterns and cloud-native best practices.