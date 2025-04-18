from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import json
import requests
from datetime import datetime, timedelta
import jwt
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import logging
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from supabase import create_client, Client
from elevenlabs import generate, play, set_api_key
import asyncio
import uuid

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS with proper settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5181"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Security
security = HTTPBearer()
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"

# Initialize Supabase client
try:
    supabase: Client = create_client(
        os.getenv("SUPABASE_URL", ""),
        os.getenv("SUPABASE_KEY", ""),
        options={
            "auth": {
                "autoRefreshToken": True,
                "persistSession": True
            }
        }
    )
except Exception as e:
    logger.error(f"Error initializing Supabase client: {e}")
    raise

# Initialize ElevenLabs
set_api_key(os.getenv("ELEVENLABS_API_KEY", ""))

# Models
class User(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class Message(BaseModel):
    text: str
    is_user: bool

# Dependencies
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Routes
@app.post("/api/auth/login", response_model=Token)
async def login(user: User):
    # Mock authentication - accept any username/password for testing
    access_token = jwt.encode(
        {"sub": user.username, "exp": datetime.utcnow() + timedelta(minutes=30)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/chat")
async def chat(message: Message, current_user: str = Depends(get_current_user)):
    try:
        # Mock AI responses for testing
        mock_responses = [
            "I understand you're feeling that way. Would you like to talk more about it?",
            "That sounds challenging. How does that make you feel?",
            "I'm here to listen. Can you tell me more about what's on your mind?",
            "It's okay to feel that way. Would you like to explore those feelings further?",
            "Thank you for sharing that with me. How can I support you right now?"
        ]
        
        # Simple mock response - just echo back with a random therapist-like response
        import random
        response = {
            "text": random.choice(mock_responses),
            "is_user": False
        }
        return response
    except Exception as e:
        logger.error(f"Error processing chat message: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing message")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 