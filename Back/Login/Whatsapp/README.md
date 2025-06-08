# WhatsApp Service

This service is part of a distributed system responsible for handling user verification via WhatsApp messages, using Twilio, Kafka, and WebSockets for real-time processing and monitoring.

## Features

- Integration with **Twilio API** for sending WhatsApp messages  
- Kafka consumer for processing verification messages  
- Webhook for receiving status updates from Twilio  
- Temporary code storage using **Redis**  
- Real-time notifications via **WebSockets**

## Technologies Used

- **.NET Core**  
- **Confluent.Kafka**  
- **Twilio API**  
- **Redis**  
- **WebSockets**  
- **ASP.NET Core** (for webhook handling)

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
KAFKA_SERVER=<kafka_server>
MESSAGES_USERS_URL=<websocket_url>
REDIS_CONNECTION=<redis_connection_string>
TWILIO_ACCOUNT_SID=<twilio_account_sid>
TWILIO_AUTH_TOKEN=<twilio_auth_token>
TWILIO_PHONE_NUMBER=<twilio_whatsapp_number>
Installation
dotnet restore
Execution
dotnet run
Main Components
Services
•	TwilioWhatsappService: Sends messages via Twilio
•	SocketNotificationService: Manages real-time notifications
•	RedisCodeStorageService: Stores and retrieves verification codes
•	VerificationService: Coordinates the full verification process
Webhook
The service exposes an endpoint at:
http://localhost:4002
This receives message status updates from Twilio.
Kafka Consumer
Processes messages from the Verification topic with the following configuration:
•	Consumer group: "verification-group"
•	Auto-commit: Disabled to ensure consistency
•	Auto offset reset: "earliest" (process from the oldest message)
Workflow
1.	A verification message is received via Kafka
2.	A verification code is generated
3.	The code is sent via WhatsApp using Twilio
4.	The code is temporarily stored in Redis
5.	Twilio sends updates to the webhook
6.	The system notifies in real time using WebSockets
Docker
The service is containerized and can be run with Docker:
docker-compose up
Project Structure
├── Config/
│   └── AppConfig.cs               # Application configuration
├── Models/
│   └── VerificationMessage.cs     # Verification data model
├── Services/
│   ├── Implementations/           # Concrete service implementations
│   ├── Interfaces/                # Service interfaces
│   └── VerificationService.cs     # Main process coordinator
├── Program.cs                     # Service entry point
└── Dockerfile                     # Docker configuration
Error Handling
•	Automatic retries on network or external service errors
•	Detailed logging for each operation
•	Real-time notifications on errors
•	Graceful shutdown with orderly resource management
Monitoring
The service provides detailed logs on:
•	WhatsApp message delivery statuses
•	Kafka event processing
•	WebSocket connections and events
•	Webhook responses and events
