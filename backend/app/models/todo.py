from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from enum import Enum
from .base import TimestampModel

class TodoStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"

class TodoBase(TimestampModel):
    title: str = Field(max_length=255)
    description: Optional[str] = Field(default=None)
    due_date: Optional[datetime] = Field(default=None)
    status: TodoStatus = Field(default=TodoStatus.PENDING)
    is_completed: bool = Field(default=False) # Keep for backward compat, will deprecate in favor of status

class Todo(TodoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)

class TodoCreate(TodoBase):
    pass

class TodoRead(TodoBase):
    id: int
    user_id: str

class TodoUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: Optional[TodoStatus] = None
    is_completed: Optional[bool] = None