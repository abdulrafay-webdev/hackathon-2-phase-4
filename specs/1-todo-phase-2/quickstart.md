# Quickstart: Evolution of Todo - Phase II

## Prerequisites
- Python 3.11+
- Node.js 18+
- Neon PostgreSQL Account

## Backend Setup
1. Navigate to `backend/`
2. Create virtual environment: `python -m venv venv`
3. Activate: `venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Configure `.env`:
   ```
   DATABASE_URL=your_neon_url
   BETTER_AUTH_SECRET=your_secret
   ```
6. Run: `uvicorn app.main:app --reload`

## Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Configure `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   BETTER_AUTH_SECRET=your_secret
   ```
4. Run: `npm run dev`
