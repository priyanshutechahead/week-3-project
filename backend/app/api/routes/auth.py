from fastapi import APIRouter, HTTPException

from app.schemas.auth_schema import UserSignup
from app.core.db import users_collection
from app.core.security import hash_password

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/signup")
def signup(user: UserSignup):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "interests": [],
        "saved_countries": []
    }

    users_collection.insert_one(new_user)

    return {
        "message": "User registered successfully"
    }