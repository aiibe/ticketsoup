#!/bin/sh

set -e

# Create or update the superuser
/pocketbase superuser upsert "$SUPERUSER_EMAIL" "$SUPERUSER_PASSWORD"

# Run migrations
/pocketbase migrate history-sync

# Start PocketBase server
/pocketbase serve --http=0.0.0.0:8090
