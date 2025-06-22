# Read_Story Service

This microservice is responsible for retrieving a list of user stories from the Proyecto Octavo platform. It is built with Node.js, Express, Bull for job queueing, MongoDB for storage, and Redis for queue management. The service is containerized with Docker for easy deployment and integrates with other platform services via Socket.IO and JWT authentication.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Queue Processing](#queue-processing)
- [Environment Variables](#environment-variables)
- [Docker Usage](#docker-usage)
- [Testing](#testing)
- [Development Notes](#development-notes)
- [License](#license)

---

## Project Structure

```
Read_Story/
│
├── .dockerignore
├── .env
├── .gitignore
├── babel.config.json
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── package.json
├── server.js
│
├── __tests__/
│   └── server.test.js
│
├── Config/
│   ├── mongo.config.js
│   └── redis.config.js
│
├── Database/
│   └── connect.js
│
├── Services/
│   ├── jwt.service.js
│   ├── notification.service.js
│   └── user.service.js
```

---

## Features

- **Queue-based Story Retrieval:** Uses Bull and Redis to process story retrieval jobs asynchronously.
- **MongoDB Integration:** Retrieves stories from a MongoDB database using flexible filters.
- **JWT Authentication:** Verifies user tokens before processing jobs.
- **Real-time Notifications:** Sends notifications to users via Socket.IO after processing.
- **Modular Codebase:** Follows separation of concerns for easy maintenance and extension.
- **Dockerized:** Ready for deployment in containerized environments.
- **Unit Testing:** Includes Jest-based tests for core services.

---

## Installation

### Prerequisites

- Node.js 18+
- npm
- MongoDB instance
- Redis instance
- (Optional) Docker

### Steps

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd Read_Story
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**  
   Edit the `.env` file with your MongoDB, Redis, and service endpoints (see [Environment Variables](#environment-variables)).

---

## Usage

### Run Locally

```sh
npm start
```

The service will listen on the port specified in your `.env` file (default: `4026`).

---

## Queue Processing

This service does not expose REST endpoints directly for story retrieval. Instead, it listens to a Bull queue named `Read_Story` and processes jobs as follows:

1. **Job Received:**  
   The job must contain a user `Id`, a `Token` (JWT), and a `Filter` object for querying stories.

2. **JWT Verification:**  
   The service verifies the JWT token using an external API.

3. **Story Retrieval:**  
   If the token is valid, the service queries MongoDB for stories matching the filter, sorts them by creation date, and processes the results to extract titles and languages.

4. **Notification:**  
   The user is notified of the result via Socket.IO.

**Example Job Data:**
```json
{
  "Id": "user_id",
  "Token": "jwt_token",
  "Filter": {
    "Id": "user_id"
  }
}
```

---

## Environment Variables

The `.env` file should include:

```
PORT=4026

# Redis configuration for Bull queue
BULL_STORY_HOST=52.201.55.56
BULL_STORY_PORT=6379

# MongoDB connection string
MONGODB=mongodb://3.232.36.18:27017/Story

# Socket.IO endpoint for notifications
PORT_MESSAGES_USERS=http://54.161.163.55:4003/

# JWT verification API endpoint
API_JWT=http://35.171.131.67:4012
```

---

## Docker Usage

### Build and Run with Docker Compose

```sh
docker-compose up --build
```

- The service will be available at port `4026` (as mapped in `docker-compose.yml`).

### Dockerfile Highlights

- Uses `node:22-bullseye` as the base image.
- Installs all dependencies.
- Exposes port `4026`.

---

## Testing

Unit tests are provided using Jest. To run tests:

```sh
npm test
```

Test files are located in the `__tests__/` directory.

---

## Development Notes

- **Queue Processing:**  
  The queue concurrency is set to process up to 5 jobs at a time.
- **Error Handling:**  
  If JWT verification fails or an error occurs, the user is notified with an appropriate message.
- **Extensibility:**  
  The modular structure allows for easy addition of new services or queue processors.

---

## License

ISC

---

## Author

Proyecto