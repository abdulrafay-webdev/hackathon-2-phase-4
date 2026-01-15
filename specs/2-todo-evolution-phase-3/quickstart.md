# Quickstart: Evolution of Todo - Phase 3

## Environment Variables

### Backend (`backend/.env`)
```ini
DATABASE_URL=postgresql://... (Use existing)
CLERK_ISSUER_URL=https://<your-clerk-domain>.clerk.accounts.dev
```

### Frontend (`frontend/.env.local`)
```ini
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running

1. **Backend**:
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
