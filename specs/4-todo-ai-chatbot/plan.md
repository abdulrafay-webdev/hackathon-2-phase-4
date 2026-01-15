# Implementation Plan: Todo AI Chatbot

**Branch**: `4-todo-ai-chatbot` | **Date**: 2026-01-15 | **Spec**: [specs/4-todo-ai-chatbot/spec.md](../spec.md)
**Input**: Feature specification from `specs/4-todo-ai-chatbot/spec.md`

## Summary

Enable users to manage Todo tasks via a natural language AI chatbot. The system will expose a stateless POST endpoint `/api/{user_id}/chat` that utilizes the OpenAI Agents SDK to orchestrate interactions. A new MCP Server (using the Official MCP SDK) will provide task management tools (`add_task`, `list_tasks`, etc.) to the agent. Conversation history and tasks will persist in the existing PostgreSQL database (SQLModel), ensuring a fully stateless backend architecture. Frontend integration will use OpenAI ChatKit.

## Technical Context

**Language/Version**: Python 3.11+ (Backend), TypeScript 5.x (Frontend)
**Primary Dependencies**: 
- Backend: FastAPI, SQLModel, OpenAI Agents SDK, Official MCP SDK, Clerk SDK (Auth)
- Frontend: Next.js 14, OpenAI ChatKit, Tailwind CSS
**Storage**: Neon Serverless PostgreSQL (Conversations + Tasks)
**Testing**: Pytest (Backend), Jest/React Testing Library (Frontend)
**Target Platform**: Vercel (Frontend), Vercel/Railway (Backend - Python)
**Project Type**: Web Application (Full Stack)
**Performance Goals**: API response < 3s, Conversation load < 500ms
**Constraints**: Fully stateless backend, Clerk Auth integration, Strict typing
**Scale/Scope**: Single user session context, scalable to multiple users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Agentic Development Protocol**: Plan follows strict SDD flow. [PASS]
- **II. Stateless AI Architecture**: Plan enforces stateless backend & DB persistence. [PASS]
- **III. Evolutionary Implementation**: Plan extends existing Todo models and Clerk Auth. [PASS]
- **IV. Interactive User Experience**: Chatbot interface defined with conversational requirements. [PASS]
- **V. Secure Configuration**: All secrets via `.env`. [PASS]
- **VI. Documentation & Standards**: Adheres to official SDK docs (OpenAI, MCP). [PASS]

## Project Structure

### Documentation (this feature)

```text
specs/4-todo-ai-chatbot/
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
│   ├── agents/              # NEW: AI Agent logic & orchestration
│   │   ├── chat_agent.py    # Main agent entry point
│   │   └── prompts.py       # System prompts
│   ├── mcp/                 # NEW: MCP Server implementation
│   │   ├── server.py        # MCP Server instance
│   │   └── tools.py         # Tool definitions (add_task, etc.)
│   ├── models/
│   │   ├── conversation.py  # NEW: Conversation & Message models
│   │   └── todo.py          # EXISTING: Todo model (extended if needed)
│   ├── api/
│   │   └── endpoints/
│   │       └── chat.py      # NEW: Chat endpoint
│   └── main.py              # Update to include new routes
└── tests/
    ├── agents/              # Agent tests
    └── mcp/                 # MCP tool tests

frontend/
├── src/
│   ├── components/
│   │   └── chat/            # NEW: Chat UI components
│   │       ├── chat-window.tsx
│   │       └── message-bubble.tsx
│   ├── lib/
│   │   └── api.ts           # Update with chat API calls
│   └── app/
│       └── chat/            # NEW: Chat page route
│           └── page.tsx
```

**Structure Decision**: Extend existing `backend` and `frontend` directories. Add dedicated `agents` and `mcp` modules to backend to separate AI concerns from standard CRUD API.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
