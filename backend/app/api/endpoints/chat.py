from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from sqlmodel import Session, select
import uuid
import json
from app.core.db import engine
from app.models.conversation import Conversation, Message, ConversationRead, MessageRead
from app.agents.chat_agent import run_agent
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[uuid.UUID] = None

class ChatResponse(BaseModel):
    conversation_id: uuid.UUID
    reply: str

@router.post("/{user_id}/chat", response_model=ChatResponse)
async def chat(user_id: str, request: ChatRequest):
    try:
        with Session(engine) as session:
            # 1. Get or Create Conversation
            if request.conversation_id:
                conversation = session.get(Conversation, request.conversation_id)
                if not conversation or conversation.user_id != user_id:
                    raise HTTPException(status_code=404, detail="Conversation not found")
            else:
                conversation = Conversation(user_id=user_id, title=request.message[:50])
                session.add(conversation)
                session.commit()
                session.refresh(conversation)

            # 2. Persist User Message
            user_msg = Message(
                conversation_id=conversation.id,
                role="user",
                content=request.message
            )
            session.add(user_msg)
            session.commit()

            # 3. Load History (for stateless agent)
            statement = select(Message).where(Message.conversation_id == conversation.id).order_by(Message.created_at)
            history = session.exec(statement).all()
            
            # Format history for OpenAI
            openai_msgs = []
            for m in history:
                msg_dict = {"role": m.role, "content": m.content}
                if m.tool_call_id:
                    msg_dict["tool_call_id"] = m.tool_call_id
                if m.tool_calls:
                    msg_dict["tool_calls"] = json.loads(m.tool_calls)
                openai_msgs.append(msg_dict)

            # 4. Run Agent
            agent_responses = run_agent(user_id, openai_msgs)

            # 5. Persist Assistant/Tool Responses
            final_reply = ""
            for resp in agent_responses:
                # Handle both dicts and OpenAI objects
                if hasattr(resp, 'role'):
                    role = resp.role
                    content = resp.content or ""
                    tool_calls = json.dumps([t.model_dump() for t in resp.tool_calls]) if hasattr(resp, 'tool_calls') and resp.tool_calls else None
                    tool_call_id = None
                else:
                    role = resp.get("role")
                    content = resp.get("content") or ""
                    tool_calls = None
                    tool_call_id = resp.get("tool_call_id")

                new_msg = Message(
                    conversation_id=conversation.id,
                    role=role,
                    content=content,
                    tool_calls=tool_calls,
                    tool_call_id=tool_call_id
                )
                session.add(new_msg)
                
                if role == "assistant" and content:
                    final_reply = content

            session.commit()

            return ChatResponse(
                conversation_id=conversation.id,
                reply=final_reply
            )
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return ChatResponse(
            conversation_id=request.conversation_id or uuid.uuid4(),
            reply="I'm sorry, I encountered an error processing your request. Please try again later."
        )

@router.get("/{user_id}/chat/history", response_model=List[ConversationRead])
async def get_conversations(user_id: str):
    with Session(engine) as session:
        statement = select(Conversation).where(Conversation.user_id == user_id).order_by(Conversation.updated_at.desc())
        results = session.exec(statement).all()
        return results

@router.get("/{user_id}/chat/history/{conversation_id}", response_model=List[MessageRead])
async def get_messages(user_id: str, conversation_id: uuid.UUID):
    with Session(engine) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation or conversation.user_id != user_id:
            raise HTTPException(status_code=404, detail="Conversation not found")
            
        statement = select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)
        results = session.exec(statement).all()
        return results
