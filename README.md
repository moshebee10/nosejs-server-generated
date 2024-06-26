# Calculator API with Docker

This project contains a simple Calculator API implemented in Node.js, which performs arithmetic operations and uses JWT for authorization. The project is containerized using Docker and Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow the steps below to build and run the Docker container for the Calculator API.

### Step 1: Build the Docker Image

1. Open a terminal and navigate to the root directory of the project where the `Dockerfile` and `docker-compose.yml` files are located.
2. Run the following command to build the Docker image:

   ```sh
   <!-- to build -->
   docker-compose build
   <!-- to run -->
   docker-compose up -d
