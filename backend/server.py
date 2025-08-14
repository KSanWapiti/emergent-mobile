from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import bcrypt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# User Models
class UserRegistration(BaseModel):
    pseudo: str
    firstName: str
    lastName: str
    height: int
    dateOfBirth: str
    gender: str
    bodyType: str
    city: str

class UserResponse(BaseModel):
    id: str
    pseudo: str
    firstName: str
    lastName: str
    height: int
    dateOfBirth: str
    gender: str
    bodyType: str
    city: str
    createdAt: datetime
    updatedAt: datetime

class CheckPseudoRequest(BaseModel):
    pseudo: str

class CheckPseudoResponse(BaseModel):
    available: bool
    message: str

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# User Registration Endpoints
@api_router.post("/check-pseudo", response_model=CheckPseudoResponse)
async def check_pseudo_availability(request: CheckPseudoRequest):
    """Check if a pseudo is available"""
    try:
        existing_user = await db.users.find_one({"pseudo": request.pseudo})
        
        if existing_user:
            return CheckPseudoResponse(
                available=False,
                message="Ce pseudo est déjà utilisé"
            )
        else:
            return CheckPseudoResponse(
                available=True,
                message="Ce pseudo est disponible"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/register", response_model=UserResponse)
async def register_user(user_data: UserRegistration):
    """Register a new user"""
    try:
        # Check if pseudo is already taken
        existing_user = await db.users.find_one({"pseudo": user_data.pseudo})
        if existing_user:
            raise HTTPException(status_code=400, detail="Ce pseudo est déjà utilisé")
        
        # Create user document
        user_doc = {
            "id": str(uuid.uuid4()),
            "pseudo": user_data.pseudo,
            "firstName": user_data.firstName,
            "lastName": user_data.lastName,
            "height": user_data.height,
            "dateOfBirth": user_data.dateOfBirth,
            "gender": user_data.gender,
            "bodyType": user_data.bodyType,
            "city": user_data.city,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        
        # Insert user into database
        result = await db.users.insert_one(user_doc)
        
        if result.inserted_id:
            return UserResponse(**user_doc)
        else:
            raise HTTPException(status_code=500, detail="Failed to create user")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/users", response_model=List[UserResponse])
async def get_users():
    """Get all users (for testing purposes)"""
    try:
        users = await db.users.find().to_list(1000)
        return [UserResponse(**user) for user in users]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Existing endpoints
@api_router.get("/")
async def root():
    return {"message": "Tyte API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
