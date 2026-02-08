<!-- 
  Sync Impact Report:
  - Version change: 2.0.0 → 3.0.0 (Phase IV Launch)
  - Modified principles:
    - Renamed & Expanded I: "Agentic Development" → "AI-Native DevOps" (Focus on Docker/K8s agents)
    - Renamed & Expanded II: "Stateless AI Architecture" → "Stateless & Ephemeral Architecture" (K8s focus)
    - Renamed V: "Secure Configuration" → "Security & Secrets Management"
    - Retained III: "Evolutionary Implementation" (Deploying existing app)
  - Added principles:
    - II. Spec-Driven Infrastructure (Helm/K8s mandates)
    - V. Observability & Debugging Readiness
  - Removed principles:
    - IV. Interactive User Experience (Focus shifts to Deployment UX)
  - Templates requiring updates: 
    - ✅ plan-template.md (Infrastructure/Helm sections)
    - ✅ tasks-template.md (DevOps phases)
  - Follow-up TODOs: None
-->

# Phase 4 – Todo AI Chatbot Constitution

## Core Principles

### I. AI-Native DevOps
**Agents First.** The primary interface for infrastructure creation and management is AI.
- **Tooling:** Utilize **Docker AI Gordon**, **kubectl-ai**, and **kagent** for operational tasks.
- **No Manual YAML:** Avoid writing Kubernetes manifests or Dockerfiles manually. Instruct agents to generate them from specifications.
- **Human Role:** Architect and Auditor. Review generated infrastructure code for security and correctness.

### II. Spec-Driven Infrastructure
Infrastructure is Code, and Code comes from Specs.
- **Helm Standard:** All deployments must be packaged as **Helm Charts**.
- **Definition:** Infrastructure requirements (replicas, resources, ingress) must be defined in `specs/` before `helm install`.
- **Reproducibility:** The deployment process must be repeatable on any fresh Minikube instance.

### III. Stateless & Ephemeral Architecture
The application layout must align with Cloud Native patterns.
- **Cattle, Not Pets:** Pods must be capable of restarting or being killed at any time without data loss.
- **External State:** All persistence (Database) relies on **Neon PostgreSQL**. The K8s cluster treats the DB as an external resource (or strictly managed StatefulSet if local).
- **Configuration:** Runtime config is injected via ConfigMaps and Secrets, never baked into images.

### IV. Security & Secrets Management
Zero trust for local or cloud environments.
- **Secrets Management:** Never commit secrets to Git. Use `.env` for local simulation and K8s Secrets for cluster injection.
- **Least Privilege:** Service accounts and container permissions should be minimized (e.g., non-root users in Dockerfiles).
- **Transparency:** Explicitly document required secrets in `quickstart.md`.

### V. Observability & Debugging Readiness
If you can't see it, it doesn't work.
- **Logs:** All containers must emit structured logs to stdout/stderr.
- **Health Checks:** Implement Liveness and Readiness probes for all services.
- **Access:** Ensure generic instructions exist for accessing logs and shells (`kubectl logs`, `kubectl exec`) for debugging.

### VI. Evolutionary Implementation
**Deploy the Existing.** We are moving the Phase 3 application to the Cloud.
- **No Rewrites:** Do not refactor application business logic unless strictly required for containerization (e.g., changing host binding to `0.0.0.0`).
- **Compatibility:** The containerized version must match the behavior of the local dev version.

## Development Workflow

1.  **Specify**: Define deployment requirements in `specs/`.
2.  **Plan**: Architect the Helm Chart/K8s structure in `specs/<feature>/plan.md`.
3.  **Task**: Break down Docker/K8s/Agent tasks in `specs/<feature>/tasks.md`.
4.  **Implement**: Use AI Agents to generate Dockerfiles and Helm Charts.
5.  **Verify**: Deploy to Minikube and validate via Health Checks and User scenarios.

## Governance

**Amendments**: Changes to this constitution require a PR and approval from the project lead.
**Versioning**: Semantic Versioning. Major bumps for breaking governance changes.
**Compliance**: All infrastructure code and plans must reference these principles.

**Version**: 3.0.0 | **Ratified**: 2026-01-06 | **Last Amended**: 2026-02-05