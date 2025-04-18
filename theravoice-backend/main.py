from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
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
import asyncio
import uuid
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.date import DateTrigger
import pytz

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS with proper settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", 
                  "http://localhost:5176", "http://localhost:5177", "http://localhost:5178",
                  "http://localhost:5179", "http://localhost:5180", "http://localhost:5181",
                  "http://localhost:5182"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"

# Email configuration
email_conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("EMAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("EMAIL_PASSWORD"),
    MAIL_FROM=os.getenv("EMAIL_FROM"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

# Initialize FastMail with proper error handling
try:
    fastmail = FastMail(email_conf)
    logger.info("FastMail initialized successfully")
except Exception as e:
    logger.error(f"Error initializing FastMail: {e}")
    raise

# Initialize Supabase client
try:
    supabase: Client = create_client(
        supabase_url=os.getenv("SUPABASE_URL", ""),
        supabase_key=os.getenv("SUPABASE_KEY", "")
    )
    logger.info("Supabase client initialized successfully")
except Exception as e:
    logger.error(f"Error initializing Supabase client: {e}")
    raise

# Initialize scheduler
scheduler = AsyncIOScheduler()
scheduler.start()

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

class AppointmentRequest(BaseModel):
    email: EmailStr
    appointment_time: datetime

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

@app.post("/test-email")
async def test_email(email: str):
    try:
        message = MessageSchema(
            subject="Test Email from TheraVoice",
            recipients=[email],
            body="This is a test email from TheraVoice. If you receive this, email sending is working correctly.",
            subtype="html"
        )
        
        await fastmail.send_message(message)
        logger.info(f"Test email sent successfully to {email}")
        return {"message": "Test email sent successfully"}
    except Exception as e:
        logger.error(f"Error sending test email: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/schedule-appointment")
async def schedule_appointment(appointment: AppointmentRequest):
    try:
        # Convert appointment time to PT
        pt = pytz.timezone('America/Los_Angeles')
        appointment_time_pt = appointment.appointment_time.astimezone(pt)
        
        # Validate appointment time is in the future
        if appointment_time_pt < datetime.now(pt):
            raise HTTPException(status_code=400, detail="Appointment time must be in the future")
        
        # Schedule the email reminder
        scheduler.add_job(
            send_appointment_reminder,
            DateTrigger(run_date=appointment_time_pt),
            args=[appointment.email, appointment_time_pt],
            id=str(uuid.uuid4())
        )
        
        logger.info(f"Appointment scheduled for {appointment_time_pt} PT")
        return {
            "message": "Appointment scheduled successfully",
            "appointment_time_pt": appointment_time_pt.isoformat(),
            "appointment_time_utc": appointment.appointment_time.isoformat()
        }
    except Exception as e:
        logger.error(f"Error scheduling appointment: {e}")
        raise HTTPException(status_code=500, detail=str(e))

async def send_appointment_reminder(email: str, appointment_time: datetime):
    try:
        message = MessageSchema(
            subject="Your TheraVoice Session Reminder",
            recipients=[email],
            body="This is a reminder that your TheraVoice session is starting now.",
            subtype="html"
        )
        
        await fastmail.send_message(message)
        logger.info(f"Appointment reminder sent successfully to {email}")
    except Exception as e:
        logger.error(f"Error sending appointment reminder: {e}")
        raise

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 