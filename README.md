# KEYS Project

This project is a full-stack application built with React, TypeScript, Vite, and Node.js. It includes a frontend and a backend, both containerized using Docker. Used for the 

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Linting and Formatting](#linting-and-formatting)
- [License](#license)

## Project Structure

```
keys-project/
├── backend/
│   ├── Dockerfile
│   ├── index.ts
│   └── src/
│       ├── routes/
│       ├── controllers/
│       └── models/
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   └── vite.config.ts
├── docker-compose.yaml
└── README.md
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/your-username/keys-project.git
  cd keys-project
  ```

2. Create a `.env` file in the root directory and set the required environment variables:
  ```sh
  VITE_BACKEND_URL=http://localhost:3001
  MONGO_URL=mongodb://mongo:27017
  ```

## Running the Application

To run the application using Docker Compose, execute the following command in the root directory:

```sh
docker-compose up --build
```

This will start the frontend on `http://localhost:3002` and the backend on `http://localhost:3001`.

## Environment Variables

The following environment variables are used in this project:

- `VITE_BACKEND_URL`: URL of the backend service for the frontend.
- `MONGO_URL`: MongoDB connection string for the backend.

## Linting and Formatting

This project uses ESLint for linting and Prettier for code formatting. The ESLint configuration is located in `frontend/eslint.config.js`.

To run the linter, execute:

```sh
npm run lint
```

To format the code, execute:

```sh
npm run format
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.