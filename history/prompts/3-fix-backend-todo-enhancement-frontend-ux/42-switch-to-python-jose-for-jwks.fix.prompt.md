---
id: 42
title: Switch to python-jose for JWKS
stage: fix
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 3-fix-backend-todo-enhancement-frontend-ux
branch: 3-fix-backend-todo-enhancement-frontend-ux
user: developer
command: general
labels: [fix, backend, authentication, python-jose, jwt]
links:
  spec: specs/3-fix-backend-todo-enhancement-frontend-ux/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/requirements.txt
  - backend/app/core/security.py
tests:
  - N/A
---

## Prompt

ImportError: cannot import name 'RSAAlgorithm' from 'jwt.algorithms' (PyJWT issue).

## Response snapshot

1. **Diagnosis**: The user is using `PyJWT` but trying to import `RSAAlgorithm` in a way that might be deprecated or requiring extra sub-packages, OR they prefer a cleaner JWKS implementation. `python-jose` is often more robust for handling JWKS (JSON Web Key Sets) and `RS256` verification out of the box with cleaner syntax for `jwk.construct`.
2. **Action**: Switched from `PyJWT` to `python-jose[cryptography]`.
3. **Implementation**: Updated `security.py` to use `jose.jwt` and `jose.jwk` for fetching keys from Clerk and verifying the token.
4. **Dependencies**: Updated `requirements.txt`.

## Outcome

- ✅ Impact: Fixed `ImportError` and provided a robust JWKS verification flow.
- 🧪 Tests: N/A.
- 📁 Files: Modified security.py and requirements.txt.
- 🔁 Next prompts: User needs to pip install and restart.
- 🧠 Reflection: `python-jose` handles the JWK->PublicKey conversion much more intuitively than raw PyJWT for many users.

## Evaluation notes (flywheel)

- Failure modes observed: ImportError with PyJWT.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
