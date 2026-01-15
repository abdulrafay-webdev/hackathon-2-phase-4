# Research & Decisions: Todo AI Chatbot

**Feature**: `4-todo-ai-chatbot` | **Date**: 2026-01-15

## 1. OpenAI Agents SDK & Statelessness
**Decision**: Use `OpenAI Agents SDK` (or standard `openai` client with `tools` if specific Agents SDK is too experimental/stateful) with manual state management.
**Rationale**: The requirement is "Stateless Backend". Most "Agent" frameworks hold memory. We must manually load conversation history from Postgres into the Agent's context at the start of each request and save the new messages/state back to Postgres at the end.
**Pattern**:
1.  Request comes to `POST /chat`.
2.  Fetch `Conversation` + `Messages` from DB.
3.  Initialize Agent with history.
4.  Agent runs (loops for tool calls).
5.  Extract new messages.
6.  Save to DB.
7.  Return response.

## 2. MCP Server Integration Strategy
**Decision**: In-process Tool Definitions (Function Calling).
**Rationale**: Running a full standalone MCP Server over SSE/Stdio is unnecessary complexity for a monolithic backend where the Agent and Tools reside in the same codebase.
**Implementation**:
- Use the **Official MCP SDK** to define the tools.
- Expose these tools directly to the OpenAI Agent as `tools` (function definitions).
- The "MCP Server" in this context is a logical module `app.mcp` that strictly adheres to MCP tool interfaces, allowing future extraction if needed, but for now, they are invoked directly by the Agent logic to ensure stateless execution and shared database transaction context.

## 3. Database Schema for Chat
**Decision**: Relational `Conversation` -> `Message` tables.
**Rationale**: SQLModel fits the existing stack. JSONB could be used for message content to be flexible, but structured tables allow for easier querying and analytics.
**Schema Preview**:
- `Conversation`: `id`, `user_id`, `title`, `created_at`
- `Message`: `id`, `conversation_id`, `role` (user/assistant/tool), `content` (Text), `tool_calls` (JSON), `tool_call_id` (String)

## 4. Authentication (Clerk)
**Decision**: Reuse `app.core.security.verify_token`.
**Rationale**: The chat endpoint is just another API route. It must extract the `user_id` from the Clerk JWT to ensure the user can only access their own tasks and conversations.

## 5. Frontend Integration
**Decision**: Custom UI using OpenAI ChatKit components (or raw React if ChatKit is not suitable for custom backend).
**Rationale**: Need fine-grained control over the API calls to our custom `/api/chat` endpoint rather than a direct connection to OpenAI.
