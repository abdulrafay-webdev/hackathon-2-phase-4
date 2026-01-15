---
id: "14"
title: "Fix Vercel CORS and Clerk Deprecation"
stage: fix
date: "2026-01-15"
surface: agent
model: gemini-2.0-flash-exp
feature: todo-ai-chatbot
branch: 4-todo-ai-chatbot
user: user
command: (Fix Deployment Errors)
labels: [fix, cors, vercel, clerk, deployment]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - backend/app/main.py
  - frontend/src/app/sign-in/[[...sign-in]]/page.tsx
tests_yaml: |
  - null
---

# User Prompt

clerk.browser.js:19 Clerk: Clerk has been loaded with development keys...
clerk.browser.js:19 Clerk: The prop "afterSignInUrl" is deprecated...
Access to XMLHttpRequest at ... has been blocked by CORS policy...

# Assistant Response

Resolved Vercel deployment issues:
1. **Fixed CORS**: Updated `backend/app/main.py` to include the deployed Frontend URL in allowed origins.
2. **Fixed Clerk Deprecation**: Updated `SignIn` component to use `fallbackRedirectUrl` instead of deprecated default behavior.
3. **Action Required**: User must push changes to GitHub to trigger Vercel redeploy.
