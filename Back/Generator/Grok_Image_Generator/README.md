# GROK Image Generator Service
          
# Image Generator Service

## Overview
This service is part of a microservices architecture that generates images based on user prompts using GROK technology. It implements a queue-based system for processing image generation requests with JWT authentication.


## Flowchart of the Image Generation Module

This flowchart describes the image generation process using the Bull queue named "Grok Image Generator". When a user submits a request, it is handled by the server.js queue processor.

The JWTService validates the provided token. If the token is invalid, the NotificationService informs the user that the session has expired. If the token is valid, the GROKService triggers a call to the OpenAI GROK API using the given prompt to generate the image.

After receiving the image URL, the server downloads the image and converts it to base64 format. This result is sent to the user as a success notification. All notifications are also transmitted through Socket.IO in real time. Any exception in the process also triggers an error notification.

```mermaid
flowchart TD
    %% Inicio del flujo
    A[User submits image generation job to Bull queue Grok Image Generator] --> B[server js Queue processor]

    %% Proceso de la cola
    B --> C[JWTService verify Token Token]
    C -- Invalid Token --> D[NotificationService notify Id false Session expired Please log in again Number]
    C -- Valid Token --> E[GROKService ImageGrok Prompt]

    %% Lógica de generación de imagen
    E --> F[Call OpenAI GROK API with prompt]
    F --> G[Receive image URL from GROK API]
    G --> H[Download image and convert to base64]

    %% Notificación de éxito
    H --> I[NotificationService notify Id true data image jpeg base64 plus Image Number]

    %% Manejo de errores generales
    B -->|Exception| J[NotificationService notify Id false Error processing job Number]

    %% Comunicación con usuario
    D -.-> K[Socket IO Notification]
    I -.-> K
    J -.-> K

    %% Clases principales y archivos
    classDef service fill:#f9f,stroke:#333,stroke-width:2px;
    class B,C,E,F,G,H,I,D,J service

    %% Leyenda
    subgraph Legend [Legend]
        direction LR
        L1[server js Express app Bull queue main logic]
        L2[Services jwt service js JWTService token validation]
        L3[Services grok service js GROKService image generation]
        L4[Services notification service js NotificationService Socket IO notifications]
        L5[Config redis config js Redis queue configuration]
    end
```

## Technologies Used
- Express.js - Web framework
- Bull - Queue management
- Socket.io - Real-time notifications
- Redis - Queue backend
- JWT - Authentication
- GROK - Image generation
- Jest - Unit testing

## Features
- Asynchronous image generation using queue system
- JWT-based authentication
- Real-time notifications for job status
- Error handling and session management
- Comprehensive unit test coverage

## Environment Variables
```env
PORT=<server_port>
PORT_MESSAGES_USERS=<notification_service_port>
GROK_API=<grok_api_endpoint>
```

## Queue Process Flow
1. Receives job with Token and Prompt data
2. Validates JWT token
3. Generates image using GROK service
4. Notifies user of success/failure through WebSocket

## Request Schema
```json
{
    "Token": "string (JWT token)",
    "Prompt": "string (image generation prompt)",
    "Id": "string (unique identifier for notification)"
}
```

## Response Schema
```json
{
    "success": "boolean",
    "data": {
        "image": "string (base64 encoded image)"
    },
    "error": "string (error message if any)"
}
```

## Unit Testing
The service includes comprehensive unit tests using Jest framework. Tests cover:
- Token validation
- Queue processing
- Image generation
- Error handling
- WebSocket notifications

To run tests:
```bash
npm test
```

## Error Handling
- Session expiration notifications
- Job processing error notifications
- Queue process error management

## Dependencies
- express
- bull
- dotenv
- socket.io-client
- jest (dev dependency)

## Services Used
- NotificationService - Handles WebSocket notifications
- JWTService - Manages token validation
- GROKService - Handles image generation
- Redis - Queue management configuration

## Usage
The service listens for image generation requests and processes them through a Bull queue. Each request must include:
- Valid JWT token
- Image generation prompt

Responses are sent back to the client through WebSocket notifications.
        