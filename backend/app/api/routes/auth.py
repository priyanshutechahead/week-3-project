from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.auth_schema import UserSignup, UserLogin, GoogleLogin, TokenRefresh
from app.models.user_model import UserModel
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, SECRET_KEY, ALGORITHM
from app.core.firebase_config import verify_google_token
from jose import jwt, JWTError

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/google")
async def google_login(data: GoogleLogin):
    decoded_token, error_msg = verify_google_token(data.token)
    if not decoded_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid Google token: {error_msg}"
        )
    
    email = decoded_token.get("email")
    name = decoded_token.get("name")
    
    user = await UserModel.get_by_email(email)
    
    is_new_user = False
    if not user:
        is_new_user = True
        # Create new user if doesn't exist
        user_dict = {
            "name": name,
            "email": email,
            "persona": "Explorer",
            "interests": {
                "countries": [],
                "seasons": [],
                "flora_fauna": [],
                "landscapes": []
            },
            "auth_provider": "google"
        }
        user_id = await UserModel.create_user(user_dict)
        user = await UserModel.get_by_id(user_id)
    
    access_token = create_access_token(data={"sub": str(user["_id"])})
    refresh_token = create_refresh_token(data={"sub": str(user["_id"])})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "name": user["name"],
            "email": user["email"],
            "persona": user.get("persona")
        },
        "is_new_user": is_new_user
    }

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserSignup):
    # Check if user exists
    existing_user = await UserModel.get_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password
    user_dict = user_data.dict()
    user_dict["password_hash"] = hash_password(user_dict.pop("password"))
    
    # Initialize other fields
    user_dict["persona"] = "Explorer"
    user_dict["interests"] = {
        "countries": [],
        "seasons": [],
        "flora_fauna": [],
        "landscapes": []
    }
    
    user_id = await UserModel.create_user(user_dict)
    
    # Auto-login: generate token
    access_token = create_access_token(data={"sub": user_id})
    refresh_token = create_refresh_token(data={"sub": user_id})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "name": user_dict["name"],
            "email": user_dict["email"],
            "persona": user_dict["persona"]
        },
        "message": "User created and logged in successfully"
    }

@router.post("/login")
async def login(credentials: UserLogin):
    user = await UserModel.get_by_email(credentials.email)
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token = create_access_token(data={"sub": str(user["_id"])})
    refresh_token = create_refresh_token(data={"sub": str(user["_id"])})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "name": user["name"],
            "email": user["email"],
            "persona": user.get("persona")
        }
    }

@router.post("/refresh")
async def refresh_token(data: TokenRefresh):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(data.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        if user_id is None or token_type != "refresh":
            raise credentials_exception
            
        user = await UserModel.get_by_id(user_id)
        if not user:
            raise credentials_exception
            
        new_access_token = create_access_token(data={"sub": user_id})
        return {"access_token": new_access_token, "token_type": "bearer"}
    except JWTError:
        raise credentials_exception
