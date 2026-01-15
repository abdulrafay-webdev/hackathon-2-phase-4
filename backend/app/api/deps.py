from typing import Generator, Annotated
from sqlmodel import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.db import engine
from app.core.security import verify_token

security = HTTPBearer()

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

def get_current_user(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)]) -> dict:
    token = credentials.credentials
    payload = verify_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Token missing 'sub' claim")
    return payload
