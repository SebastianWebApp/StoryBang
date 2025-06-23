# Generator Microservices Overview

This directory contains the AI-powered content generation microservices for the Proyecto Octavo platform. Each folder represents a specialized service for generating or describing text or images, using technologies like GPT-2 and GROK. All services are containerized for easy deployment and integration.

---

## Folder Summaries

### Gpt2_Text_Generator

**Purpose:**  
Provides a RESTful API for generating stories using a custom-trained GPT-2 model.

**Key Features:**
- Built with Python (Flask) and Hugging Face Transformers.
- Accepts prompts and audience types to generate tailored stories.
- Supports different generation parameters for children, young, and adult audiences.
- Modular codebase following SOLID principles.
- Dockerized for deployment.
- Includes a `story_model/` directory for model files.

---

### Gpt2Medium_Text_Generator

**Purpose:**  
Similar to `Gpt2_Text_Generator`, this service provides a RESTful API for story generation using a different GPT-2 model or configuration, suitable for "medium" stories.

**Key Features:**
- Python (Flask) backend with Hugging Face Transformers.
- Accepts prompts and audience types.
- Custom generation parameters for different audiences.
- SOLID, modular architecture.
- Dockerized for deployment.
- Model files stored in `story_model/`.

---

### Grok_Text_Generator

**Purpose:**  
Generates text content using GROK (x.ai) technology, processing requests asynchronously via a queue.

**Key Features:**
- Node.js (Express) backend.
- Uses Bull for queue management and Redis as the backend.
- Integrates with GROK API for text generation.
- JWT-based authentication for secure requests.
- Real-time notifications via Socket.IO.
- Comprehensive unit tests with Jest.
- Dockerized for deployment.

---

### Grok_Image_Generator

**Purpose:**  
Generates images based on user prompts using GROK (x.ai) technology, processing requests asynchronously via a queue.

**Key Features:**
- Node.js (Express) backend.
- Uses Bull for queue management and Redis as the backend.
- Integrates with GROK API for image generation.
- JWT-based authentication.
- Real-time notifications via Socket.IO.
- Unit tests with Jest.
- Dockerized for deployment.

---

### Grok_Description_Image

**Purpose:**  
Generates detailed descriptions of images using GROK (x.ai) vision models, processing requests asynchronously via a queue.

**Key Features:**
- Node.js (Express) backend.
- Uses Bull for queue management and Redis as the backend.
- Integrates with GROK API for image description.
- JWT-based authentication.
- Real-time notifications via Socket.IO.
- Unit tests with Jest.
- Dockerized for deployment.

---

## General Notes

- All services are designed to be stateless, modular, and horizontally scalable.
- Each service uses environment variables for configuration and sensitive data.
- Security best practices are followed, including JWT authentication and secure error handling.
- Each folder contains its own `README.md` with further details and usage instructions.

---
