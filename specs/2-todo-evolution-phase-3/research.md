# Research: Evolution of Todo - Phase 3

## Decision: Clerk Authentication
- **Decision**: Use `@clerk/nextjs` for frontend and manual JWT verification (using JWKS) for FastAPI backend.
- **Rationale**: Constitution mandates strict adherence to Clerk documentation. Frontend SDK handles sessions/cookies. Backend must verify the `Authorization: Bearer <token>` header statelessly.
- **Alternatives considered**: 
    - Better Auth (Rejected: Constitution override).
    - Custom JWT (Rejected: Security risk).

## Decision: Glassmorphism Implementation
- **Decision**: Use Tailwind CSS `backdrop-filter`, `backdrop-blur`, `bg-opacity`, and white borders with gradients.
- **Rationale**: Standard way to achieve the effect in modern web apps without heavy CSS files.
- **Alternatives considered**: 
    - Raw CSS files (Rejected: Tailwind is project standard).
    - Component library (Rejected: Want custom "premium" feel defined in Constitution).

## Decision: Backend Token Verification
- **Decision**: Use `PyJWT` to verify RS256 tokens against Clerk's JWKS (JSON Web Key Set).
- **Rationale**: Clerk signs tokens with a private key; backend needs public key from JWKS endpoint to verify.
- **Alternatives considered**: 
    - Introspection Endpoint (Rejected: Latency).
    - Shared Secret (HS256) (Rejected: Clerk defaults to RS256 for production security).

## Resolved Clarifications
- **Clerk Keys**: Provided by user (`pk_test_...`, `sk_test_...`).
