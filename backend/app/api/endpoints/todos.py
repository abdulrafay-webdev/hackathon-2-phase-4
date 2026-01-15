from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.api.deps import get_session, get_current_user
from app.models.todo import Todo, TodoCreate, TodoRead, TodoUpdate, TodoStatus

router = APIRouter()

# ... (existing endpoints)

@router.patch("/{todo_id}/complete", response_model=TodoRead)
def mark_complete(
    todo_id: int,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    try:
        user_id = current_user.get("sub")
        db_todo = session.get(Todo, todo_id)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        if db_todo.user_id != user_id:
            raise HTTPException(status_code=403, detail="Not authorized")
        
        db_todo.status = TodoStatus.COMPLETED
        db_todo.is_completed = True
        
        session.add(db_todo)
        session.commit()
        session.refresh(db_todo)
        return db_todo
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{todo_id}/status", response_model=TodoRead)
def toggle_status(
    todo_id: int,
    status_update: dict,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("sub")
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if db_todo.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_status = status_update.get("status")
    if new_status:
        db_todo.status = new_status
        db_todo.is_completed = (new_status == "completed")
        
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

@router.post("", response_model=TodoRead)
def create_todo(
    todo: TodoCreate,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    try:
        user_id = current_user.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in token")
            
        # Explicitly creating the model instance with all required fields
        # Overwrite user_id from token, never trust body
        db_todo = Todo.model_validate(todo, update={"user_id": user_id})
        
        session.add(db_todo)
        session.commit()
        session.refresh(db_todo)
        return db_todo
    except Exception as e:
        # Log the error here in a real app
        import traceback
        traceback.print_exc()
        print(f"Error creating todo: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("", response_model=List[TodoRead])
def read_todos(
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    try:
        user_id = current_user.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in token")
        todos = session.exec(select(Todo).where(Todo.user_id == user_id)).all()
        return todos
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Error fetching todos: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.patch("/{todo_id}", response_model=TodoRead)
def update_todo(
    todo_id: int,
    todo_update: TodoUpdate,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("sub")
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if db_todo.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    todo_data = todo_update.model_dump(exclude_unset=True)
    for key, value in todo_data.items():
        setattr(db_todo, key, value)
        
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(
    todo_id: int,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("sub")
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if db_todo.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    session.delete(db_todo)
    session.commit()
