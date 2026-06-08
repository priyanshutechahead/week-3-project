from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user_schema import UserOut, UserUpdate
from app.models.user_model import UserModel
from app.core.security import get_current_user_id

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserOut)
async def get_me(user_id: str = Depends(get_current_user_id)):
    user = await UserModel.get_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Convert _id to id string for Pydantic
    user["id"] = str(user["_id"])
    return user

@router.patch("/me", response_model=UserOut)
async def update_me(update_data: UserUpdate, user_id: str = Depends(get_current_user_id)):
    data = update_data.dict(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No data provided for update")
    
    await UserModel.update_user(user_id, data)
    user = await UserModel.get_by_id(user_id)
    user["id"] = str(user["_id"])
    return user
