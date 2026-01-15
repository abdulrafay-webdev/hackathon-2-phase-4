# Quickstart: Todo AI Chatbot

## Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (Neon)
- OpenAI API Key
- Clerk API Keys

## Environment Setup
Add these to your `.env` (Backend):
```bash
OPENAI_API_KEY=sk-...
# Existing variables
DATABASE_URL=...
CLERK_ISSUER_URL=...
```

## Running the Backend
1. Activate virtual env: `.\venv\Scripts\activate`
2. Install new dependencies:
   ```bash
   pip install openai mcp
   ```
3. Run migrations (auto-generated):
   ```bash
   alembic revision --autogenerate -m "Add conversation models"
   alembic upgrade head
   ```
4. Start server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Running the Frontend
1. Navigate to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000/chat` to test.

## Verification
1. Send a message "Add a task to buy milk".
2. Check the `todos` table in DB.
3. Check `conversations` and `messages` tables.
