### Hexlet tests and linter status:
[![Actions Status](https://github.com/JuliaGrishaeva87/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/JuliaGrishaeva87/frontend-project-12/actions)


Hexlet Chat is a sleek, channel-based messaging platform built for modern team collaboration.Stop wasting time on endless email chains. Move your discussions into dedicated channels for every project, team, or topic to keep conversations focused, organized, and fully searchable.
Take full control of your workspace — manage your channels seamlessly with the intuitive left-side sidebar.

## Features
* **Real-time Messaging:** Instant message delivery powered by WebSockets.
* **Profanity Filter:** Built-in automatic sanitization for unmoderated content.
* **Modern UI/UX:** Responsive layouts built with React-Bootstrap and Mantine components.
* **Centralized Logs:** Sentry-compatible monitoring to track runtime exceptions seamlessly.

## Project link
https://frontend-project-12-020u.onrender.com/

## Setup

All commands must be executed in the root directory of the application.

### 1. Install dependencies
Installs required production and development dependencies for both backend and frontend.
```bash
make install
```

### 2. Run in development mode (Dev mode)
Starts the Vite frontend local development server (typically available at `http://localhost:5002`) with hot module replacement (HMR)
```bash
make vite
```

### 3. Run Backend & Serve Production Build
Starts the backend production fastify server, which listens on port 5001 and automatically hosts the compiled client static assets.
```bash
make start
```

### 4. Build for production
Compiles, optimizes, and bundles all resources into the client static assets directory (`frontend/dist`):
```bash
make build
```
