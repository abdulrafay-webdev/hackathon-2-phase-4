from sqlmodel import create_engine, SQLModel, Session
import os
from dotenv import load_dotenv

# Explicitly load .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Please check your .env file.")

# Ensure Neon compatibility (if using postgresql://, SQLModel handles it fine, but some drivers prefer postgresql+psycopg2://)
# Neon connection string usually works as-is with recent sqlalchemy/sqlmodel versions.

engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)
