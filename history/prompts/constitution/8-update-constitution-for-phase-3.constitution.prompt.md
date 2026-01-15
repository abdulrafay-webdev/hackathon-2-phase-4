---
id: "8"
title: "Update Constitution for Phase 3"
stage: constitution
date: "2026-01-15"
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: user
command: /sp.constitution
labels: [constitution, phase-3, rules]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - .specify/memory/constitution.md
tests_yaml: |
  - null
---

# User Prompt

/sp.constitution You are an autonomous senior AI engineer working under Spec-Kit Plus andAgentic Dev Stack rules.PROJECT: Phase 3 – Todo AI ChatbotCONTEXT: This phase is implemented INSIDE the existing Phase 2 Todo App.CONSTITUTION:- No manual coding by the human.- Follow Agentic Dev Stack strictly:  Constitution → Specification → Plan → Tasks → Implementation- Backend must be fully STATELESS.- All state (tasks, conversations, messages) must persist in the database.- MCP tools must be stateless and database-backed.- Use Official MCP SDK only.- Use OpenAI Agents SDK for AI logic.- Ask the user for missing environment variables or credentials.- For every required value:  - Explain WHY it is needed  - Explain WHERE the user can obtain it- Extend existing Phase 2 Todo logic; do NOT duplicate it.- Confirm every task action in a friendly conversational tone.- Gracefully handle errors (task not found, invalid input).Acknowledge and store this constitution before proceeding.

# Assistant Response

Updated project constitution to v2.0.0.
- Added strict Agentic Dev Stack & No Manual Coding rules.
- Defined Stateless AI Architecture (Backend/MCP).
- Emphasized "Evolutionary Implementation" (Phase 3 inside Phase 2).
- Updated UX principles for Conversational UI.
