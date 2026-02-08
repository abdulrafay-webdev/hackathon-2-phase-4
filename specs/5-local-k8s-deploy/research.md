# Research: Local Kubernetes Deployment

**Feature**: Local Kubernetes Deployment
**Status**: Complete

## Infrastructure Decisions

### Base Images
- **Backend**: `python:3.11-slim`.
  - *Rationale*: Smaller than full standard library, but includes necessary build tools for some Python packages compared to Alpine (which causes wheel build issues). Good balance for FastAPI.
- **Frontend**: `node:20-alpine`.
  - *Rationale*: Standard for Next.js containerization. Multi-stage build will be used to minimize final image size.

### Helm Chart Structure
- **Decision**: Single Chart `todo-ai-chatbot` with multiple Deployments.
- *Structure*:
  - `templates/backend-deployment.yaml`
  - `templates/backend-service.yaml`
  - `templates/frontend-deployment.yaml`
  - `templates/frontend-service.yaml`
  - `templates/secrets.yaml` (managed via values or external secret creation)
  - `values.yaml` (configuration)
- *Rationale*: Simpler to manage than subcharts for a tightly coupled frontend/backend pair in a local context.

### Secret Management
- **Decision**: Script-based injection.
- *Mechanism*: A helper script (`scripts/sync-secrets.sh`) will parse the local `.env` file and create a Kubernetes Secret object `todo-secrets` before Helm installation.
- *Rationale*: Prevents checking secrets into Git (Constitution IV). Allows seamless local simulation using existing `.env`.

### Local Development Workflow
- **Decision**: Minikube Docker Daemon (`eval $(minikube docker-env)`).
- *Workflow*:
  1. Switch shell to Minikube Docker.
  2. `docker build -t ...` (builds directly in cluster).
  3. `helm upgrade --install ...` (redeploys).
- *Rationale*: Avoids the need for a remote registry push/pull cycle, speeding up local iteration (User Story 2).

## Tools & Agents
- **Docker Generation**: Use `docker-ai` / LLM to generate multi-stage Dockerfiles.
- **Manifest Generation**: Use `kubectl-ai` / LLM to generate initial Helm templates.
- **Verification**: Use `kagent` (if available) or `kubectl` for health checks.
