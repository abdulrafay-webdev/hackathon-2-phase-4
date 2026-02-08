#!/bin/bash
set -e

# Point to Minikube Docker
eval $(minikube docker-env)

echo "Building Backend..."
docker build -t todo-backend:latest -f backend/Dockerfile backend/

echo "Building Frontend..."
docker build -t todo-frontend:latest -f frontend/Dockerfile frontend/

echo "Restarting Pods..."
kubectl rollout restart deployment/todo-backend
kubectl rollout restart deployment/todo-frontend

echo "Update complete!"
