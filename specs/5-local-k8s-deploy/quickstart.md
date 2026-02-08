# Quickstart: Local Kubernetes Deployment

## Prerequisites
- Docker Desktop / Engine
- Minikube (`minikube start`)
- Helm 3
- `kubectl`

## 1. Environment Setup
Ensure your local `.env` file is populated in the `backend/` directory.

```bash
# Load environment secrets into Minikube
kubectl create secret generic todo-secrets \
  --from-literal=DATABASE_URL=$(grep DATABASE_URL backend/.env | cut -d '=' -f2) \
  --from-literal=OPENAI_API_KEY=$(grep OPENAI_API_KEY backend/.env | cut -d '=' -f2)
```

## 2. Build Images
Build images directly into the Minikube Docker daemon.

```bash
# Point shell to Minikube
eval $(minikube docker-env)

# Build Backend
docker build -t todo-backend:latest -f backend/Dockerfile backend/

# Build Frontend
docker build -t todo-frontend:latest -f frontend/Dockerfile frontend/
```

## 3. Deploy Chart
Install the Helm chart.

```bash
helm upgrade --install todo-app ./k8s/helm/todo-app \
  --set backend.image.pullPolicy=Never \
  --set frontend.image.pullPolicy=Never
```

## 4. Access Application
Get the URL for the frontend.

```bash
minikube service todo-frontend-service
```

## 5. Verification
Check pod status.

```bash
kubectl get pods
kubectl logs -l app=todo-backend
```

