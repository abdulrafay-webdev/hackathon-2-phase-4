# Todo AI Chatbot - Phase 4

## Local Kubernetes Deployment

This project supports local deployment on Minikube.

### Prerequisites
- Docker Desktop / Engine
- Minikube
- Helm 3
- `kubectl`

### Quickstart

1.  **Setup Secrets**:
    Ensure `backend/.env` exists with `DATABASE_URL` and `OPENAI_API_KEY`.
    ```bash
    ./scripts/sync-secrets.sh
    ```

2.  **Deploy**:
    ```bash
    eval $(minikube docker-env)
    ./scripts/dev-update.sh
    helm upgrade --install todo-app ./k8s/helm/todo-app
    ```

3.  **Access**:
    ```bash
    minikube service todo-frontend
    ```

### Development
To update code without redeploying the chart (just image update + rollout):
```bash
./scripts/dev-update.sh
```
