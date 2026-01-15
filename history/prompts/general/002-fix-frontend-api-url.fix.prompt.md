---
id: 002
title: Fix Frontend API URL
stage: fix
date: 2026-01-15
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: null
user: user
command: fix-frontend-api-url
labels: [frontend, api, bugfix]
links: null
files:
 - frontend/.env.local
tests: []
---

# User Input
ab is may check karo k meray task frontend per fetch q nhi horahay

# Assistant Response
Investigated why tasks were not fetching on the frontend.
Found that `NEXT_PUBLIC_API_URL` in `frontend/.env.local` was pointing to `http://localhost:8000`, but the backend API is served at `/api/v1`.
Updated `frontend/.env.local` to `http://localhost:8000/api/v1`.
Verified backend configuration and security settings, which appear correct.
User should restart the frontend server for changes to take effect.
