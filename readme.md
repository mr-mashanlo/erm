# Enterprise Resource Manager

Simple web application for managing company equipment assigned to employees. Built with Node.js, Express, and MSSQL using server-side rendering with EJS.

## Features

* JWT authentication via httpOnly cookies.
* Automatic token refresh every 15 minutes.
* User and Admin role-based access control.
* Server-side rendering with EJS engine.
* 3-Layer Architecture design.
* Docker support for database environment.
* Input validation and data sanitization.

## Getting Started

### Start Application
Use these commands to manage the application lifecycle.
```bash
# Create a .env file
cp .env.local .env

# Start services
docker compose up -d

# Stop services
docker compose down -v

# Restart service
docker compose restart <service>

# Log service
docker logs <service> -f
```