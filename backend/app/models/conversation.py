from typing import List, Optional
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime
import uuid
from .base import TimestampModel

class ConversationBase(TimestampModel):
    title: Optional[str] = Field(default="New Conversation")
    user_id: str = Field(index=True)

class Conversation(ConversationBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    messages: List["Message"] = Relationship(back_populates="conversation")

class MessageBase(TimestampModel):
    role: str = Field(index=True) # user, assistant, system, tool
    content: str
    tool_calls: Optional[str] = Field(default=None) # Store tool calls as JSON string
    tool_call_id: Optional[str] = Field(default=None)

class Message(MessageBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    conversation_id: uuid.UUID = Field(foreign_key="conversation.id")
    
    conversation: Conversation = Relationship(back_populates="messages")

class ConversationRead(ConversationBase):
    id: uuid.UUID

class MessageRead(MessageBase):
    id: uuid.UUID
    conversation_id: uuid.UUID

class ConversationWithMessages(ConversationRead):
    messages: List[MessageRead] = []
