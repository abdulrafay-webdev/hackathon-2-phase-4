# Implementation Plan: Local Kubernetes Deployment

**Branch**: `5-local-k8s-deploy` | **Date**: 2026-02-05 | **Spec**: [specs/5-local-k8s-deploy/spec.md](../spec.md)
**Input**: Feature specification from `/specs/5-local-k8s-deploy/spec.md`

## Summary

Containerize the existing FastAPI backend and Next.js frontend, and deploy them to a local Minikube cluster using Helm. The solution utilizes `python:3.11-slim` and `node:20-alpine` base images, manages secrets via Kubernetes Secrets (injected from local `.env`), and establishes a local development workflow using the Minikube Docker daemon.

## Technical Context

**Language/Version**: Python 3.11 (Backend), Node.js 20 (Frontend)
**Primary Dependencies**: Docker, Kubernetes (Minikube), Helm 3, FastAPI, Next.js
**Storage**: External Neon PostgreSQL (accessed via connection string secret)
**Testing**: `kubectl` readiness probes, manual verification script
**Target Platform**: Minikube (Local Kubernetes)
**Project Type**: Infrastructure / Web Application
**Performance Goals**: Build & Deploy < 5 minutes
**Constraints**: Stateless backend, Secrets Management (No git commits), Non-root containers
**Scale/Scope**: Local Dev Cluster (1 replica default)

## Constitution Check

*GATE: Passed.*

- **AI-Native DevOps**: Plan explicitly uses AI agents (via tasks) for Docker/Helm generation.
- **Spec-Driven Infrastructure**: `specs/` drive the Helm values and templates.
- **Stateless**: Backend treated as ephemeral; state is in external Neon DB.
- **Security**: Secrets injected via `kubectl create secret` from env, not baked in.
- **Observability**: Standard K8s logging and probes included in design.

## Project Structure

### Documentation (this feature)

```text
specs/5-local-k8s-deploy/
├── plan.md              # This file
├── research.md          # Technology decisions (Images, Workflow)
├── data-model.md        # Infrastructure Schema (Services, Ports, Config)
├── quickstart.md        # Deployment Instructions
└── tasks.md             # Implementation Tasks
```

### Source Code (repository root)

```text
backend/
├── Dockerfile           # NEW: Backend container definition
├── .dockerignore        # NEW: Context optimization
└── app/

frontend/
├── Dockerfile           # NEW: Frontend container definition
├── .dockerignore        # NEW: Context optimization
└── src/

k8s/                     # NEW: Infrastructure Directory
└── helm/
    └── todo-app/        # NEW: Main Helm Chart
        ├── Chart.yaml
        ├── values.yaml
        └── templates/
            ├── backend-deployment.yaml
            ├── backend-service.yaml
            ├── frontend-deployment.yaml
            └── frontend-service.yaml
```

**Structure Decision**: Standard Helm Chart layout in a root `k8s/` directory to separate infrastructure from application code. Dockerfiles reside in their respective app directories for build context isolation.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Helm Charts | Standardization | Plain `kubectl apply -f .yaml` is harder to template and manage configurations for different environments (local vs prod). |
