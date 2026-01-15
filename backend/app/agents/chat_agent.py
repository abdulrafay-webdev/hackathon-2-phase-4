import json
from typing import List, Dict, Any, Optional
from openai import OpenAI
from app.core.config import settings
from app.mcp.tools import add_task, list_tasks, complete_task, delete_task, update_task
from app.models.conversation import Message

client = OpenAI(api_key=settings.OPENAI_API_KEY)

SYSTEM_PROMPT = """
You are a helpful and efficient Todo AI Assistant. Your goal is to help users manage their tasks using natural language.
You have access to tools to add, list, complete, delete, and update tasks.

Rules:
1. Always confirm task actions in a friendly conversational tone.
2. If a user's request is ambiguous, ask for clarification (e.g., if they say "complete it" but multiple tasks are pending).
3. You can handle dates and times (e.g., "tomorrow", "at 5pm"). Assume the current date is Thursday, January 15, 2026.
4. If you perform an action like listing tasks, show the IDs clearly so the user can refer to them.
5. If a user refers to "the first one" or "the milk task" after you listed them, use the IDs you found in the list to call the specific tools.
6. Be concise but helpful.
"""

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "add_task",
            "description": "Add a new todo task.",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string", "description": "The title of the task."},
                    "description": {"type": "string", "description": "Optional detailed description."},
                    "due_date": {"type": "string", "format": "date-time", "description": "Optional due date and time."}
                },
                "required": ["title"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "list_tasks",
            "description": "List existing tasks.",
            "parameters": {
                "type": "object",
                "properties": {
                    "status": {"type": "string", "enum": ["pending", "completed"], "description": "Filter by status."}
                }
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "complete_task",
            "description": "Mark a task as completed.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "integer", "description": "The ID of the task to complete."}
                },
                "required": ["task_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "delete_task",
            "description": "Remove a task permanently.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "integer", "description": "The ID of the task to delete."}
                },
                "required": ["task_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "update_task",
            "description": "Update an existing task's title or description.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "integer", "description": "The ID of the task to update."},
                    "title": {"type": "string", "description": "The new title."},
                    "description": {"type": "string", "description": "The new description."}
                },
                "required": ["task_id"]
            }
        }
    }
]

def run_agent(user_id: str, messages: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Run the OpenAI Agent with history and return the new messages generated.
    This is stateless: it takes history and returns updates.
    """
    
    # Prepend system prompt if not present
    full_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages
    
    response = client.chat.completions.create(
        model="gpt-4o", # Using gpt-4o for high quality
        messages=full_messages,
        tools=TOOLS,
        tool_choice="auto"
    )
    
    assistant_message = response.choices[0].message
    new_messages = []
    
    # Handle Tool Calls
    if assistant_message.tool_calls:
        # Add the assistant message with tool calls to the stream
        new_messages.append(assistant_message)
        
        for tool_call in assistant_message.tool_calls:
            function_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)
            
            # Add user_id to arguments for the tool
            arguments["user_id"] = user_id
            
            # Map function names to actual tool calls
            tool_map = {
                "add_task": add_task,
                "list_tasks": list_tasks,
                "complete_task": complete_task,
                "delete_task": delete_task,
                "update_task": update_task
            }
            
            if function_name in tool_map:
                result = tool_map[function_name](**arguments)
                new_messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": result
                })
        
        # Call back to OpenAI with the tool results to get the final conversational response
        final_response = client.chat.completions.create(
            model="gpt-4o",
            messages=full_messages + new_messages
        )
        new_messages.append(final_response.choices[0].message)
    else:
        new_messages.append(assistant_message)
        
    return new_messages
