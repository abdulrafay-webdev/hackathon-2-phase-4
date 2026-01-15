# Implementation Tasks: Todo AI Chatbot

**Branch**: `4-todo-ai-chatbot` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phases

### Phase 1: Setup
**Goal**: Initialize project environment with new dependencies for AI and MCP support.

- [x] T001 Install Backend Dependencies (openai, mcp) in `backend/requirements.txt`
- [x] T002 Configure Environment Variables for OpenAI in `backend/.env`
- [x] T003 [P] Install Frontend Dependencies (openai-chatkit/custom components) in `frontend/package.json`

### Phase 2: Foundational
**Goal**: Establish core data models and basic server structure before feature logic.

- [x] T004 Create Conversation and Message Models in `backend/app/models/conversation.py`
- [x] T005 Create Migration for Chat Tables in `backend/alembic/versions`
- [x] T006 Implement MCP Tool Definitions (add_task, list_tasks, etc.) in `backend/app/mcp/tools.py`
- [x] T007 [P] Create Chat UI Shell (Empty Page) in `frontend/app/chat/page.tsx`

### Phase 3: User Story 1 (Add Task via NL)
**Goal**: Enable users to add tasks using natural language.
**Story**: [US1] Add Task via Natural Language (P1)
**Test Criteria**: User types "Buy milk", Task "Buy milk" appears in DB.

- [x] T008 [US1] Implement OpenAI Agent Logic (System Prompt + Tool Binding) in `backend/app/agents/chat_agent.py`
- [x] T009 [US1] Implement Chat API Endpoint (POST /api/{user_id}/chat) in `backend/app/api/endpoints/chat.py`
- [x] T010 [US1] Connect Chat API to Agent and MCP Tools in `backend/app/api/endpoints/chat.py`
- [x] T011 [US1] [P] Implement Chat Window Component in `frontend/src/components/chat/chat-window.tsx`
- [x] T012 [US1] Connect Frontend Chat to Backend API in `frontend/src/lib/api.ts`

### Phase 4: User Story 2 (Contextual Management)
**Goal**: Enable listing, updating, and completing tasks via chat.
**Story**: [US2] Contextual Task Management (P1)
**Test Criteria**: User says "List tasks", Bot lists tasks. User says "Complete first one", Task updates.

- [x] T013 [US2] Verify List/Update/Complete MCP Tools integration in `backend/app/mcp/tools.py`
- [x] T014 [US2] Update System Prompt for Context Awareness in `backend/app/agents/prompts.py`
- [x] T015 [US2] [P] Enhance Chat UI to Render structured task lists (if applicable) in `frontend/src/components/chat/message-bubble.tsx`

### Phase 5: User Story 3 (Persistence)
**Goal**: Ensure conversation history is saved and reloaded.
**Story**: [US3] Conversation Persistence (P2)
**Test Criteria**: Refresh page -> History remains.

- [x] T016 [US3] Implement History Retrieval Endpoint (GET /api/{user_id}/chat/history) in `backend/app/api/endpoints/chat.py`
- [x] T017 [US3] Update Chat Agent to Load History from DB on Init in `backend/app/agents/chat_agent.py`
- [x] T018 [US3] [P] Implement History Loading on Frontend Mount in `frontend/app/chat/page.tsx`

### Phase 6: Polish
**Goal**: Refine UI/UX and Error Handling.

- [x] T019 Implement Graceful Error Handling for AI Failures in `backend/app/api/endpoints/chat.py`
- [x] T020 Style Chat UI with Glassmorphism/Tailwind in `frontend/src/components/chat/chat-window.tsx`
- [x] T021 Add Loading States/Typing Indicators in `frontend/src/components/chat/message-bubble.tsx`

## Dependencies

1. **Setup** must be done first.
2. **Foundational** (Models/MCP Tools) blocks all User Stories.
3. **US1** (Basic Chat) blocks US2 (Context) and US3 (Persistence).
4. **US3** relies on the Data Models from Foundational but logic builds on US1.

## Implementation Strategy

1. **MVP**: Complete Phases 1, 2, and 3. This gives a functional "Add Task" bot.
2. **Context**: Add Phase 4 to make it useful for management.
3. **Robustness**: Add Phase 5 for persistence.
4. **Polish**: Final UI tweaks.
