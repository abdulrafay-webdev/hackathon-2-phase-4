#!/bin/bash

# Check for .env file
ENV_FILE="backend/.env"
SECRET_NAME="todo-secrets"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE not found. Please create it with DATABASE_URL and OPENAI_API_KEY."
    exit 1
fi

# Check for kubectl
if ! command -v kubectl &> /dev/null; then
    echo "Error: kubectl could not be found."
    exit 1
fi

echo "Syncing secrets from $ENV_FILE to Kubernetes secret '$SECRET_NAME'..."

# Delete existing secret if it exists
kubectl delete secret $SECRET_NAME --ignore-not-found

# Extract values and create secret
# Note: This is a basic parser. For complex env files, consider more robust parsing.
DATABASE_URL=$(grep "^DATABASE_URL=" $ENV_FILE | cut -d '=' -f2-)
OPENAI_API_KEY=$(grep "^OPENAI_API_KEY=" $ENV_FILE | cut -d '=' -f2-)

if [ -z "$DATABASE_URL" ] || [ -z "$OPENAI_API_KEY" ]; then
    echo "Error: DATABASE_URL or OPENAI_API_KEY not found in $ENV_FILE"
    exit 1
fi

kubectl create secret generic $SECRET_NAME \
    --from-literal=DATABASE_URL="$DATABASE_URL" \
    --from-literal=OPENAI_API_KEY="$OPENAI_API_KEY"

echo "Secret '$SECRET_NAME' created successfully."
