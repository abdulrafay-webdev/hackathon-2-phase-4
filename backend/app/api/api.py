from fastapi import APIRouter
from app.api.endpoints import users, todos, chat

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(todos.router, prefix="/todos", tags=["todos"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
