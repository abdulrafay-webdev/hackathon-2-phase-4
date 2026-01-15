<!-- 
  Sync Impact Report:
  - Version change: 1.0.0 → 2.0.0
  - Modified principles:
    - Added I. Agentic Development Protocol (Strict SDD, No Manual Coding)
    - Added II. Stateless AI Architecture (MCP, OpenAI SDK, DB State)
    - Added III. Evolutionary Implementation (Extend don't duplicate)
    - Modified IV. Interactive User Experience (Conversational + Modern UI)
    - Modified V. Secure Configuration (Explicit "Why & Where")
  - Added sections: None
  - Removed sections: None
  - Templates requiring updates: None
  - Follow-up TODOs: None
-->

# Phase 3 – Todo AI Chatbot Constitution

## Core Principles

### I. Agentic Development Protocol
**Zero Manual Coding.** The human user functions solely as an architect and decision-maker.
- **Strict Stack:** Adhere strictly to the Agentic Dev Stack: **Constitution → Specification → Plan → Tasks → Implementation**.
- **Lifecycle:** Do not skip steps. Every feature must be specified and planned before implementation code is written.

### II. Stateless AI Architecture
The system MUST be designed as a stateless orchestration layer over a persistent database.
- **Backend & MCP:** Both the Backend and MCP tools must be fully **STATELESS**.
- **Persistence:** All state (tasks, conversations, message history, user preferences) MUST persist in the database (PostgreSQL/SQLModel).
- **SDK Compliance:** Use **only** the Official MCP SDK and OpenAI Agents SDK for AI logic.
- **Scalability:** System must survive restarts without state loss.

### III. Evolutionary Implementation
**Extend, Do Not Duplicate.** This is Phase 3, operating *inside* the existing Phase 2 Todo App.
- **Reuse:** Leverage existing Phase 2 logic (Auth, Data Models, API Endpoints) wherever possible.
- **Integration:** New features (Chatbot, AI analysis) must integrate seamlessly with the current architecture.
- **Hygiene:** Do not create parallel systems for identical entities (e.g., use the existing `Todo` model, don't make a `Task` model if `Todo` suffices).

### IV. Interactive User Experience
The User Experience shifts to a conversational-first interface while maintaining visual polish.
- **Conversational Tone:** Confirm every task action (creation, deletion, update) in a friendly, helpful conversational tone.
- **Graceful Handling:** Handle errors (e.g., "task not found", "invalid input") gracefully with helpful prompts, not raw error dumps.
- **Visuals:** Maintain the **Modern Frontend Standards** (Glassmorphism, Tailwind, Next.js) defined in Phase 2 for all UI elements.

### V. Secure Configuration & Transparency
Never proceed with missing configuration or assumptions.
- **Ask First:** If an environment variable, credential, or key is missing, **PAUSE** and ask the user.
- **Explain Context:** For every request, explain **WHY** it is needed and **WHERE** the user can obtain it.
- **Security:** Never hardcode secrets. All keys must be loaded from `.env`.

### VI. Documentation & Standards Adherence
- **Authoritative Sources:** Follow official documentation (Clerk, Next.js, FastAPI, OpenAI, MCP) strictly.
- **Type Safety:** Maintain strict typing (TypeScript/Pydantic) across the stack.

## Development Workflow

1.  **Specify**: Define the requirement in `specs/`.
2.  **Plan**: Architect the solution in `specs/<feature>/plan.md`.
3.  **Task**: Break down into testable steps in `specs/<feature>/tasks.md`.
4.  **Implement**: Execute tasks using the established principles.
5.  **Verify**: Confirm functionality against the Spec and Constitution.

## Governance

**Amendments**: Changes to this constitution require a PR and approval from the project lead.
**Versioning**: Semantic Versioning. Major bumps for breaking governance changes.
**Compliance**: All code and plans must reference these principles.

**Version**: 2.0.0 | **Ratified**: 2026-01-06 | **Last Amended**: 2026-01-15
