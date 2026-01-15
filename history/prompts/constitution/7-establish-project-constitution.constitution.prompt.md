---
id: 7
title: Establish Project Constitution
stage: constitution
date: 2026-01-06
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: none
branch: 1-todo-phase-2
user: developer
command: /sp.constitution
labels: [constitution, governance, principles, auth, frontend, backend]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - N/A
---

## Prompt

/sp.constitution Establish project principles strictly following official documentation for all technologies. Do not invent authentication flows. Authentication must be implemented exactly as defined in Clerk Auth documentation. Frontend must be built with Next.js and include modern, premium UI with glassmorphism effects, soft blur backgrounds, smooth transitions, responsive layouts, and accessibility best practices. Backend must follow clean architecture, separation of concerns, and security best practices. Never hardcode secrets or keys. Always ask the user for missing configuration values before proceeding. Clearly explain where each required key, secret, or URL comes from and how to obtain it from official dashboards or CLIs. Prioritize maintainability, scalability, and developer experience.

## Response snapshot

Created initial constitution (v1.0.0) with 6 core principles:
1. Strict Documentation Adherence
2. Modern Frontend Standards (Glassmorphism, Next.js)
3. Clean Backend Architecture (FastAPI, SQLModel)
4. Secure Authentication (Clerk - strict adherence)
5. Configuration Transparency
6. Developer Experience

## Outcome

- ✅ Impact: Established governance for the project.
- 🧪 Tests: N/A.
- 📁 Files: Updated .specify/memory/constitution.md.
- 🔁 Next prompts: /sp.specify or /sp.plan.
- 🧠 Reflection: User explicitly switched to Clerk Auth in this prompt, overriding the previous Better Auth direction. The constitution now enforces Clerk.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
