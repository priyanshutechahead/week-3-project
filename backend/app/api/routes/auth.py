from fastapi import APIRouter, HTTPException
from app.schemas.auth_schema import UserSignup
from app.schemas.auth_schema import Userlogin
from app.core.db import users_collection
from app.core.security import(
    hash_password,
    verify_password,
    create_access_token
)


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
        "mobile_number": user.mobile_number,
        "interests": [],
        "saved_countries": [],
        "onboarding_completed": false
    }

    users_collection.insert_one(new_user)

    return {
        "message": "User registered successfully"
    }

@router.post("/login")
def login(user: Userlogin):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    password_correct = verify_password(
        user.password,
        existing_user["password"]
    )

    if not password_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "email": existing_user["email"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "onboarding_completed":
        existing_user.get(
            "onboarding_completed", False
        )
    }
