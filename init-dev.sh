#!/bin/bash

# Load .env.local
if [ -f .env.local ]; then
    source .env.local
    if [ -z "$SUPERUSER_EMAIL" ] || [ -z "$SUPERUSER_PASSWORD" ]; then
        echo "Error: Missing SUPERUSER_EMAIL or SUPERUSER_PASSWORD in .env.local file"
        exit 1
    fi
else
    echo "Error: Missing .env.local file"
    exit 1
fi

# Create superuser
./pb/pocketbase superuser upsert "$SUPERUSER_EMAIL" "$SUPERUSER_PASSWORD"
