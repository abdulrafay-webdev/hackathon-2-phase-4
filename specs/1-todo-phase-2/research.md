# Research: Evolution of Todo - Phase II

## Decision: Better Auth JWT Verification in FastAPI
- **Decision**: Use `PyJWT` in FastAPI to verify tokens signed by Better Auth using the `BETTER_AUTH_SECRET`.
- **Rationale**: Better Auth (JS) and FastAPI (Python) need a shared secret or a public key to verify identity. Using a shared secret (HS256) is the simplest approach for a single-secret setup.
- **Alternatives considered**: 
    - RSA (RS256): More secure (public/private key) but requires managing key pairs.
    - Clerk/Auth0: External providers with existing Python SDKs, but the user specifically asked for Better Auth.

## Decision: Monorepo Structure
- **Decision**: Simple folder-based monorepo (`backend/`, `frontend/`).
- **Rationale**: Keeps the project organized without the complexity of build tools like Nx or Turborepo if not strictly necessary for two projects.
- **Alternatives considered**: 
    - Multi-repo: Harder to manage related changes.
    - Turborepo: Great for scaling, but might be overkill for this initial phase.

## Decision: Database Interaction
- **Decision**: SQLModel (SQLAlchemy + Pydantic).
- **Rationale**: Provides type safety and integrates perfectly with FastAPI.
- **Alternatives considered**: 
    - Raw SQLAlchemy: Requires separate Pydantic models (duplicate code).
    - Tortoise ORM: Async-first, but SQLModel is more standard for FastAPI.

## Resolved Clarifications
- **BETTER_AUTH_SECRET**: `q3J8Kx9nVwL2YpT7D4eZr0mh6d5l8SxU`
- **JWT Expiration**: `7d`
