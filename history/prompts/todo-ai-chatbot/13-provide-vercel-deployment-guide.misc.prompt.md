---
id: "13"
title: "Provide Vercel Deployment Guide"
stage: misc
date: "2026-01-15"
surface: agent
model: gemini-2.0-flash-exp
feature: todo-ai-chatbot
branch: 4-todo-ai-chatbot
user: user
command: (Vercel Deployment Request)
labels: [deployment, vercel, guide]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - backend/vercel.json
  - frontend/vercel.json
tests_yaml: |
  - null
---

# User Prompt

ab isay vercel per deploy karnay ka tareeqa batao

# Assistant Response

Provided a step-by-step guide to deploy the monorepo on Vercel.
- Strategy: Deploy as two separate Vercel projects (Frontend & Backend) connected to the same Git repo.
- Backend Setup: Set Root Directory to `backend`, add env vars (`DATABASE_URL`, `OPENAI_API_KEY`, `CLERK_ISSUER_URL`).
- Frontend Setup: Set Root Directory to `frontend`, add env vars (`NEXT_PUBLIC_CLERK_...`, `NEXT_PUBLIC_API_URL`).
- Important: Update `NEXT_PUBLIC_API_URL` in frontend to point to the deployed backend URL.
