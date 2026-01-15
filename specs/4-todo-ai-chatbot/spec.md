# Feature Specification: Todo AI Chatbot

**Feature Branch**: `4-todo-ai-chatbot`  
**Created**: 2026-01-15  
**Status**: Draft  
**Input**: User description provided in prompt.

## User Scenarios & Testing

### User Story 1 - Add Task via Natural Language (Priority: P1)

As a user, I want to add todo tasks by just typing them naturally (e.g., "Buy milk tomorrow"), so that I don't have to fill out structured forms.

**Why this priority**: Core value proposition of the chatbot interface.

**Independent Test**: Can be tested by sending a chat message and verifying the task appears in the database/list.

**Acceptance Scenarios**:

1. **Given** an authenticated user in the chat interface, **When** they type "Remind me to call John at 5pm", **Then** a new task "Call John" with due date/time 5pm is created, AND the bot replies confirming the action.
2. **Given** a user, **When** they type "Buy groceries", **Then** a task "Buy groceries" is added with default status 'pending'.

---

### User Story 2 - Contextual Task Management (Priority: P1)

As a user, I want to list, update, or complete tasks using conversation (e.g., "Mark the last one as done"), so that I can manage my work hands-free or quickly.

**Why this priority**: Essential for a complete management loop.

**Independent Test**: Create tasks, then ask bot to list/modify them.

**Acceptance Scenarios**:

1. **Given** a list of tasks, **When** user says "What do I have to do?", **Then** the bot returns a summarized list of pending tasks.
2. **Given** the bot just listed tasks, **When** user says "Mark the first one as done", **Then** the first task in the list is updated to 'completed'.
3. **Given** a specific task "Buy milk", **When** user says "Delete the milk task", **Then** that task is removed.

---

### User Story 3 - Conversation Persistence (Priority: P2)

As a user, I want my chat history to be saved, so that I can close the browser and resume the conversation later without losing context.

**Why this priority**: Provides a seamless experience and prevents data loss.

**Independent Test**: Start chat, refresh page/restart browser, verify history loads.

**Acceptance Scenarios**:

1. **Given** an active conversation with 5 messages, **When** the user refreshes the page, **Then** all 5 messages are reloaded in the chat window.

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide a generic POST endpoint `/api/{user_id}/chat` that accepts a user message and returns an AI response.
- **FR-002**: System MUST persist all `Conversation` and `Message` entities in the PostgreSQL database using SQLModel.
- **FR-003**: The backend MUST NOT store any conversation state in memory; it MUST retrieve context from the database for every request.
- **FR-004**: System MUST integrate the **OpenAI Agents SDK** to orchestrate the conversation and tool selection.
- **FR-005**: System MUST implement an **MCP Server** (using Official MCP SDK) that exposes the following tools to the AI Agent:
  - `add_task(title: str, description: str, due_date: datetime)`
  - `list_tasks(status: str, limit: int)`
  - `update_task(task_id: int, updates: dict)`
  - `complete_task(task_id: int)`
  - `delete_task(task_id: int)`
- **FR-006**: The AI Agent MUST analyze natural language input and automatically call the appropriate MCP tool(s).
- **FR-007**: System MUST reuse existing **Clerk Auth** implementation for request authentication and user identity.
- **FR-008**: System MUST support retrieving past conversation history to provide context to the AI model.

### Key Entities

- **Conversation**: Represents a chat thread. Attributes: `id`, `user_id`, `created_at`, `updated_at`, `title`.
- **Message**: A single exchange in a conversation. Attributes: `id`, `conversation_id`, `role` (user/assistant/system), `content`, `created_at`.
- **Task**: Existing entity (Phase 2).

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can add a valid task via chat in under 3 seconds (API response time).
- **SC-002**: 100% of conversation history is available after a page reload.
- **SC-003**: AI Agent correctly maps user intent to MCP tools with >90% accuracy for standard requests (add, list, complete).
- **SC-004**: System handles concurrent chat requests from multiple users without cross-talk (state isolation).

## Assumptions

- We will use `gpt-4o` or `gpt-4-turbo` (or similar high-capability model) for the agent logic.
- The frontend will utilize `OpenAI ChatKit` or a compatible UI component for rendering the chat.
