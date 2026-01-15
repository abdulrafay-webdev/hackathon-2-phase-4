# Implementation Plan: Evolution of Todo - Phase 3

**Branch**: `2-todo-evolution-phase-3` | **Date**: 2026-01-06 | **Spec**: [specs/2-todo-evolution-phase-3/spec.md](spec.md)
**Input**: Feature specification for secure Clerk authentication and glassmorphism UI.

## Summary
Implement Phase 3 by replacing the custom Better Auth implementation with Clerk for authentication on both frontend (Next.js) and backend (FastAPI). Introduce a Glassmorphism design system using Tailwind CSS utility classes. Ensure strict tenancy enforcement where users only access their own todos.

## Technical Context

**Language/Version**: Python 3.11+, TypeScript 5.x  
**Primary Dependencies**: 
- **Frontend**: `@clerk/nextjs`, `tailwindcss`, `framer-motion` (for smooth transitions)
- **Backend**: `fastapi`, `sqlmodel`, `httpx` or `pyjwt` (for JWKS verification)
**Storage**: PostgreSQL (Neon) - reusing existing DB  
**Testing**: `pytest` (backend), Manual verification (frontend)  
**Target Platform**: Vercel (Frontend & Backend)  
**Project Type**: Monorepo (Web application)  
**Performance Goals**: <200ms API latency, Glassmorphism effects optimized with CSS backdrop-filter  
**Constraints**: Strict adherence to Clerk docs; no custom auth logic.  
**Scale/Scope**: Single tenant per user view.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Documentation Adherence**: Plan follows Clerk's Next.js and manual JWT verification docs.
- [x] **Modern Frontend Standards**: Next.js + Tailwind + Glassmorphism specified.
- [x] **Clean Backend Architecture**: Middleware/Dependency for Auth separation.
- [x] **Secure Authentication**: Clerk is the sole provider.
- [x] **Configuration Transparency**: Keys identified and requested.

## Project Structure

### Documentation (this feature)

```text
specs/2-todo-evolution-phase-3/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── main.py          
│   ├── api/             
│   ├── core/            
│   │   ├── config.py    # Env vars
│   │   └── security.py  # Clerk JWT Verification logic
│   ├── models/          
│   └── services/        
└── requirements.txt

frontend/
├── src/
│   ├── app/             
│   │   ├── layout.tsx   # ClerkProvider wrapper
│   │   ├── sign-in/     # Clerk Sign In Page
│   │   ├── sign-up/     # Clerk Sign Up Page
│   │   └── dashboard/   # Protected Dashboard
│   ├── components/
│   │   └── ui/          # Glassmorphism components (Card, Button)
│   └── middleware.ts    # Clerk Middleware
└── package.json
```

**Structure Decision**: Continue with existing Monorepo structure. Refactor `core/security.py` and `frontend/middleware.ts` to swap Better Auth for Clerk.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| JWKS Caching | Backend needs to verify Clerk tokens without calling Clerk API every time | Calling API every request is too slow |
