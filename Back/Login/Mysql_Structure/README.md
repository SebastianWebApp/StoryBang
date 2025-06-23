```markdown
# Mysql_Structure Microservice

## Description
The Mysql_Structure microservice is a Node.js service designed to manage MySQL database connections and structure. It provides an abstraction layer for connection management and database status verification.

## Service Architecture and Startup Flow

```mermaid
flowchart TD
    %% Start of flow
    A[Service starts npm start or Docker] --> B[server js loads env sets up Express CORS JSON]
    B --> C[Test Connection Controllers test_connection js]

    %% Test_Connection logic
    C --> D[connectToDB getConnection Database connect js]
    D -- Success --> E[Log Successful database connection]
    E --> F[connection release]
    F --> G[InitializeDatabase Modules structure js]

    %% Database initialization
    G --> H[createDatabase]
    H --> I[CREATE DATABASE IF NOT EXISTS StoryBang]
    G --> J[createTable]
    J --> K[USE StoryBang CREATE TABLE IF NOT EXISTS Users]
    G --> L[procedures]
    L --> M[DROP and CREATE PROCEDURE ReadRecord]
    L --> N[DROP and CREATE PROCEDURE CreateRecord]
    L --> O[DROP and CREATE PROCEDURE UpdateRecord]
    L --> P[DROP and CREATE PROCEDURE DeleteRecord]
    P --> Q[Log Stored procedures created successfully]
    Q --> R[process exit]

    %% Connection error handling
    D -- Error --> S[Log Retrying database connection]
    S --> T[Wait 10 seconds]
    T --> C

    %% Express app routes
    B --> U[Express handles all routes]
    U --> V{Route exists?}
    V -- No --> W[Return 404 JSON Status false Response Resource not found]

    %% Testing and Docker
    X[Jest and Supertest in __tests__ server test js]
    Y[Dockerfile and docker compose yml for containerization]

    %% Legend
    subgraph Legend
        direction LR
        L1[server js Express app loads env starts connection test]
        L2[Controllers test_connection js Test Connection logic]
        L3[Database connect js MySQL connection pool]
        L4[Modules structure js Database table procedure creation]
        L5[env Configuration]
        L6[Dockerfile docker compose yml Deployment]
        L7[__tests__ server test js Automated tests]
    end
```

## Features
- MySQL connection verification
- HTTP error handling
- CORS support
- Environment variable configuration
- Test mode for testing

## Technologies Used
- Node.js
- Express.js
- CORS
- dotenv
- MySQL (for database connection)

## Main Dependencies
```json
{
  "express": "^4.x.x",
  "cors": "^2.x.x",
  "dotenv": "^16.x.x"
}
```

## Configuration
1. Create a `.env` file in the project root:
```plaintext
PORT=3000
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=contraseña
DB_DATABASE=nombre_base_datos
```

## Project Structure
```
Mysql_Structure/
├── Controllers/
│   └── test_connection.js    # Controller for connection testing
├── Database/                 # Database configuration
├── Modules/                  # Additional modules
├── __tests__/               # Unit tests
├── .env                     # Environment variables
├── server.js                # Main entry point
├── Dockerfile               # Docker configuration
└── docker-compose.yml       # Docker Compose configuration
```

## Endpoints
- **404 Not Found**
  - Default response for undefined routes
  - Returns: `{ Status: false, Response: "Resource not found" }`

## Installation and Execution

### Local
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

### Docker
1. Build the image:
   ```bash
   docker build -t mysql-structure .
   ```

2. Run with Docker Compose:
   ```bash
   docker-compose up
   ```

## Testing
- The service includes Jest configuration for testing
- Run tests with:
   ```bash
   npm test
   ```

## Development Features
- CORS middleware configured for cross-origin requests
- Built-in JSON handling
- Automatic database connection verification on startup
- Separate test mode (NODE_ENV=test)

## Security
- CORS implementation for access control
- Sensitive variables managed through environment variables
- Generic error messages to prevent sensitive information exposure

## Contribution
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Notes
- Designed to be part of a microservices architecture
- Performs connection verification on service startup
- Includes standard HTTP error handling
- Flexible configuration via environment variables
```