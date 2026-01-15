from typing import Optional, List
from datetime import datetime
from sqlmodel import Session, select
from app.models.todo import Todo, TodoStatus
from app.core.db import engine

# This module provides logical MCP tools that interact with the database.
# In a full MCP implementation, these would be exposed via an MCP Server.
# Here they are defined as Python functions that the Agent can call.

def add_task(user_id: str, title: str, description: Optional[str] = None, due_date: Optional[datetime] = None) -> str:
    """Add a new todo task."""
    with Session(engine) as session:
        todo = Todo(
            title=title,
            description=description,
            due_date=due_date,
            user_id=user_id,
            status=TodoStatus.PENDING
        )
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return f"Task '{title}' added successfully with ID {todo.id}."

def list_tasks(user_id: str, status: Optional[str] = None) -> str:
    """List tasks for the user, optionally filtered by status."""
    with Session(engine) as session:
        statement = select(Todo).where(Todo.user_id == user_id)
        if status:
            statement = statement.where(Todo.status == status)
        
        results = session.exec(statement).all()
        if not results:
            return "No tasks found."
        
        output = "Your tasks:\n"
        for t in results:
            due = f" (Due: {t.due_date})" if t.due_date else ""
            output += f"- [{t.id}] {t.title}: {t.status}{due}\n"
        return output

def complete_task(user_id: str, task_id: int) -> str:
    """Mark a task as completed."""
    with Session(engine) as session:
        todo = session.get(Todo, task_id)
        if not todo or todo.user_id != user_id:
            return f"Task with ID {task_id} not found."
        
        todo.status = TodoStatus.COMPLETED
        todo.is_completed = True
        session.add(todo)
        session.commit()
        return f"Task '{todo.title}' marked as completed."

def delete_task(user_id: str, task_id: int) -> str:
    """Delete a task."""
    with Session(engine) as session:
        todo = session.get(Todo, task_id)
        if not todo or todo.user_id != user_id:
            return f"Task with ID {task_id} not found."
        
        session.delete(todo)
        session.commit()
        return f"Task '{todo.title}' deleted successfully."

def update_task(user_id: str, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> str:
    """Update an existing task's title or description."""
    with Session(engine) as session:
        todo = session.get(Todo, task_id)
        if not todo or todo.user_id != user_id:
            return f"Task with ID {task_id} not found."
        
        if title:
            todo.title = title
        if description:
            todo.description = description
            
        session.add(todo)
        session.commit()
        return f"Task '{task_id}' updated successfully."
