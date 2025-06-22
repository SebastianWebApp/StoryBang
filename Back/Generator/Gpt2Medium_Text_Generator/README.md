# GPT-2 Medium Story Generator API

This project provides a RESTful API for generating stories using a custom-trained GPT-2 model. The service is built with Flask, follows SOLID principles, and is containerized with Docker for easy deployment.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Usage](#docker-usage)
- [Configuration](#configuration)
- [Development Notes](#development-notes)

---

## Project Structure

```
Gpt2Medium_Text_Generator/
│
├── main.py                      # Entry point for the Flask API
├── requirements.txt             # Python dependencies
├── Dockerfile                   # Docker build instructions
├── docker-compose.yml           # Docker Compose configuration
├── .gitignore
├── .dockerignore
│
├── src/
│   ├── api/
│   │   └── story_controller.py      # API routes and controller logic
│   ├── domain/
│   │   ├── story.py                 # Story entity definition
│   │   └── story_generator.py       # Abstract base for story generators
│   └── infrastructure/
│       └── gpt2_story_generator.py  # GPT-2 implementation of story generator
│
└── story_model/                 # Directory containing the trained GPT-2 model and configs
    ├── config.json
    ├── generation_config.json
    ├── merges.txt
    ├── model.safetensors
    ├── special_tokens_map.json
    ├── tokenizer_config.json
    ├── tokenizer.json
    ├── training_args.bin
    └── vocab.json
```

---

## Features

- **REST API** for story generation using GPT-2.
- Supports different audience types (children, young, adult) with custom generation parameters.
- Modular and extensible codebase using SOLID principles.
- Dockerized for easy deployment.
- CORS enabled for cross-origin requests.

---

## Installation

### Prerequisites

- Python 3.10+
- [pip](https://pip.pypa.io/en/stable/)
- (Optional) [Docker](https://www.docker.com/)

### Steps

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd Gpt2Medium_Text_Generator
   ```

2. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

3. **Download or place your trained GPT-2 model files in the `story_model/` directory.**

---

## Usage

### Run Locally

```sh
python main.py
```

The API will be available at [http://localhost:4021](http://localhost:4021).

---

## API Endpoints

### `POST /generate_story`

**Description:**  
Generates a story based on a prompt and audience type.

**Request Body (JSON):**
```json
{
  "Prompt": "Once upon a time in a distant land...",
  "Audience": "children"
}
```

**Response (Success):**
```json
{
  "Status": true,
  "Content": "[Content]: Once upon a time in a distant land... (generated story)"
}
```

**Response (Error):**
```json
{
  "error": "No prompt provided"
}
```

---

## Docker Usage

### Build and Run with Docker Compose

```sh
docker-compose up --build
```

- The service will be available at port `4021` by default.

### Dockerfile Highlights

- Uses `python:3.10-slim` as the base image.
- Installs PyTorch and Transformers.
- Exposes port `4021`.

---

## Configuration

- **Model Checkpoint:**  
  The GPT-2 model and tokenizer files must be placed in the `story_model/` directory.
- **Port:**  
  The default port is `4021`. You can change this in `main.py` or in the Docker Compose file.

---

## Development Notes

- The code follows SOLID principles:
  - **Single Responsibility:** Each module/class has a clear responsibility.
  - **Open/Closed:** Easily extendable for new models or controllers.
  - **Dependency Inversion:** Controllers depend on abstract interfaces, not concrete implementations.
- To add a new story generator, implement the `StoryGenerator` abstract class in `src/domain/story_generator.py`.

