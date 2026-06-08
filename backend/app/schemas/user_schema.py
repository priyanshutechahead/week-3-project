from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserInterests(BaseModel):
    countries: List[str] = []
    seasons: List[str] = []
    flora_fauna: List[str] = []
    landscapes: List[str] = []

class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    persona: Optional[str] = "Explorer"
    interests: UserInterests = UserInterests()

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    persona: Optional[str] = None
    interests: Optional[UserInterests] = None

class UserOut(UserBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
