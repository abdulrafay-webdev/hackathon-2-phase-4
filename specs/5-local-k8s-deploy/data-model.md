# Infrastructure Data Model

**Feature**: Local Kubernetes Deployment

## Container Images

### Backend Image
- **Base**: `python:3.11-slim`
- **Exposed Port**: 8000
- **Environment Variables**:
  - `DATABASE_URL` (Secret)
  - `OPENAI_API_KEY` (Secret)
  - `PORT` (Config)

### Frontend Image
- **Base**: `node:20-alpine` (Runtime)
- **Exposed Port**: 3000
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL` (Config/Build time) - *Note: Needs handling for browser access vs server-side access.*

## Kubernetes Resources

### ConfigMaps
- **Name**: `todo-config`
- **Fields**:
  - `BACKEND_HOST`: Internal cluster DNS (`todo-backend`)
  - `FRONTEND_PORT`: `3000`

### Secrets
- **Name**: `todo-secrets` (Opaque)
- **Fields**:
  - `DATABASE_URL`: Connection string to Neon DB
  - `OPENAI_API_KEY`: API Key

### Services
- **Backend Service**:
  - **Type**: `ClusterIP`
  - **Port**: 80
  - **TargetPort**: 8000
- **Frontend Service**:
  - **Type**: `NodePort` (or `LoadBalancer` via Minikube tunnel)
  - **Port**: 80
  - **TargetPort**: 3000

## Helm Values (`values.yaml`)

```yaml
backend:
  replicaCount: 1
  image:
    repository: todo-backend
    tag: latest
  service:
    port: 80

frontend:
  replicaCount: 1
  image:
    repository: todo-frontend
    tag: latest
  service:
    type: NodePort
    port: 80
```
