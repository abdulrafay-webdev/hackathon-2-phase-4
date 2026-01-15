# Data Model: Todo AI Chatbot

## Entity: Conversation
Represents a continuous interaction thread between a user and the AI.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary Key |
| `user_id` | String | Yes | Clerk User ID (Foreign Key owner) |
| `title` | String | No | Auto-generated title of the chat |
| `created_at` | DateTime | Yes | UTC timestamp |
| `updated_at` | DateTime | Yes | UTC timestamp of last message |

## Entity: Message
Represents a single atomic message within a conversation.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary Key |
| `conversation_id` | UUID | Yes | FK to Conversation |
| `role` | String | Yes | `user`, `assistant`, `system`, or `tool` |
| `content` | Text | Yes | The actual text content |
| `tool_calls` | JSON | No | List of tool calls made by assistant |
| `tool_call_id` | String | No | ID of the tool call this message responds to |
| `created_at` | DateTime | Yes | Order of messages |

## Entity: Todo (Existing - Reference)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Int | Yes | Primary Key |
| `title` | String | Yes | Task title |
| `description` | String | No | Task details |
| `status` | String | Yes | `pending`, `completed` |
| `user_id` | String | Yes | Owner |

## Relationships
- One `User` has Many `Conversations`.
- One `Conversation` has Many `Messages`.
- `Messages` are ordered by `created_at`.
