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

### Environment
Create a .env file based on the provided .env.local template.
```bash
cp .env.local .env
```

### Database Setup
Start the SQL Server container and apply the database schema.
```bash
docker compose up -d
sqlcmd -S localhost -U sa -P <password> -i schema.sql
```

### Start Application
Use these commands to manage the application lifecycle.
```bash
# Start services
docker compose up -d --build

# Stop services
docker compose down

# Restart service
docker compose restart <service>

# Log service
docker logs <service>
```