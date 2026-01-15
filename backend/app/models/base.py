from sqlmodel import SQLModel
from datetime import datetime
from typing import Optional
from sqlmodel import Field

class TimestampModel(SQLModel):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
