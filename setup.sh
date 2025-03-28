#!/bin/bash

# Load .env
if [ -f .env ]; then
    source .env
    if [ -z "$SUPERUSER_EMAIL" ] || [ -z "$SUPERUSER_PASSWORD" ]; then
        echo "Error: Missing SUPERUSER_EMAIL or SUPERUSER_PASSWORD in .env file"
        exit 1
    fi
else
    echo "Error: Missing .env file"
    exit 1
fi

# Create superuser
./pocketbase_bin superuser create "$SUPERUSER_EMAIL" "$SUPERUSER_PASSWORD"

# TODO Run migrations

# Run pocketbase service
./pocketbase_bin serve
