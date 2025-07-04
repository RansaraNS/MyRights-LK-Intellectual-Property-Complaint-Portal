#!/bin/bash

# Setup script for environment variables
# Make this file executable: chmod +x setup-env.sh

echo "Setting up environment variables..."

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "Loading environment variables from .env.local"
    export $(cat .env.local | grep -v '^#' | xargs)
    echo "Environment variables loaded successfully!"
else
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "Please edit .env.local with your actual values and run this script again."
    exit 1
fi

# Verify important variables are set
echo "Verifying environment variables..."

if [ -z "$DB_PASSWORD" ]; then
    echo "DB_PASSWORD is not set"
    exit 1
fi

if [ -z "$TWILIO_AUTH_TOKEN" ]; then
    echo "TWILIO_AUTH_TOKEN is not set"
    exit 1
fi

echo "All required environment variables are set!"

# Start the application
echo "Starting Spring Boot application..."
./mvnw spring-boot:run