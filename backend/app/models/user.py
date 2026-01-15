from typing import Optional
from sqlmodel import Field, SQLModel
from .base import TimestampModel

class User(TimestampModel, table=True):
    id: str = Field(primary_key=True)
    email: str
    # Password is not stored here, managed by Better Auth
