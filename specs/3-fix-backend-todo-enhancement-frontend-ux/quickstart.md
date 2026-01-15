# Quickstart: Todo App Improvements & Fixes

## Migrations (Backend)
Since we are modifying the DB schema, we need to run migrations.

1. **Install Alembic**:
   ```bash
   cd backend
   pip install alembic
   ```

2. **Initialize Alembic** (if not done):
   ```bash
   alembic init alembic
   ```

3. **Configure Alembic**:
   Update `alembic.ini` with `DATABASE_URL`.

4. **Generate Migration**:
   ```bash
   alembic revision --autogenerate -m "Add description status due_date"
   ```

5. **Apply Migration**:
   ```bash
   alembic upgrade head
   ```

## Running
Same as before:
- Backend: `uvicorn app.main:app --reload`
- Frontend: `npm run dev`
