# Decrypt Microservice

## Description
A decryption microservice implemented in Ruby that provides a GraphQL endpoint for decrypting sensitive data (phone and password) using the AES-256-CFB algorithm. It employs the Decorator pattern to handle decryption and validation logic.

## GraphQL Login Mutation - Decryption Flow (Sinatra)

This flowchart illustrates how a Sinatra-based backend handles a POST request to decrypt an encrypted phone and password using a GraphQL mutation and a decorator-based decryption chain.

```mermaid
flowchart TD
    %% Inicio del flujo
    A[User sends POST / with GraphQL mutation and encrypted phone password] --> B[Sinatra app server rb]

    %% Middleware y configuración
    B --> C[Load ENV vars from env and set CORS headers]

    %% Ruta principal
    B --> D[POST slash endpoint]

    %% Lógica del endpoint
    D --> E[Parse JSON body]
    E -- Invalid JSON --> F[Return 400 Invalid JSON]
    E -- Valid JSON --> G[Execute GraphQL schema with query and variables]

    %% GraphQL Schema
    G --> H[MutationType decrypt phone password]

    %% Decorator Chain
    H --> I[ValidationDecorator decrypt data]
    I -- Empty data --> J[Raise Data cannot be empty]
    I -- Valid data --> K[AESDecryptor decrypt cipher base64]
    K -- Key or IV error --> L[Raise AES key or IV error]
    K -- Decryption error --> M[Raise Error during decryption]
    K -- Success --> N[BaseDecryptor decrypt decrypted data]

    %% Respuesta
    N --> O[Return decrypted phone password in JSON]
    J --> P[Return 500 Server error]
    L --> P
    M --> P

    %% Leyenda de clases y archivos
    subgraph Legend
        direction LR
        L1[server rb Sinatra app GraphQL endpoint CORS ENV]
        L2[BaseDecryptor Base component]
        L3[ValidationDecorator Checks for empty data]
        L4[AESDecryptor Performs AES256CFB decryption]
        L5[Gemfile Dependencies sinatra graphql openssl dotenv]
        L6[env CORS ORIGIN AES KEY IV]
    end
```

## Features
- GraphQL API for decryption
- AES-256-CFB decryption
- Decorator design pattern
- Robust error handling
- CORS support
- Input data validation

## Technologies
- Ruby
- Sinatra
- GraphQL
- OpenSSL

## Dependencies
```ruby
require 'sinatra'
require 'json'
require 'base64'
require 'openssl'
require 'graphql'
```

## Configuration
Required environment variables:
- `AES_KEY`: 32-byte AES key (default value available for development)
- `AES_IV`: 16-byte initialization vector (default value available for development)

## GraphQL API

### Endpoint
- URL: `/`
- Method: `POST`

### Mutation
```graphql
mutation {
  decrypt(
    phone: "base64_encrypted_phone",
    password: "base64_encrypted_password"
  ) {
    phone
    password
  }
}
```

### Response Format
```json
{
  "data": {
    "decrypt": {
      "phone": "decrypted_phone",
      "password": "decrypted_password"
    }
  }
}
```

## Error Handling
- Key and IV length validation
- Decryption error handling
- Empty data validation
- JSON parsing errors
- Server errors

## CORS Configuration
- Origin: `*`
- Allowed methods: `POST, OPTIONS`
- Allowed headers: `Content-Type`

## Architecture
Implements the Decorator pattern with three main components:
1. `BaseDecryptor`: Base component
2. `AESDecryptor`: Decorator for AES decryption
3. `ValidationDecorator`: Decorator for data validation

## Execution

### Local
```bash
bundle install
ruby server.rb
```

### Docker
```bash
docker build -t decrypt-service .
docker-compose up
```

## Security Considerations
- Uses AES-256-CFB for secure decryption
- Input data validation
- Secure error handling without exposing sensitive details
- Recommended to configure environment variables in production

## Contribution
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Development Notes
- Ensure proper configuration of environment variables
- Test the GraphQL endpoint before deployment
- Verify compatibility with the encryption service
- Maintain the security of encryption keys