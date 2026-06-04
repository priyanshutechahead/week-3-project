from fastapi import APIRouter, HTTPException
from app.schemas.interest_schema import InterestRequest
from app.core.db import users_collection
from app.services.recommendation_service import get_recommendation

router = APIRouter(
    prefix= "/user",
    tags=["User"]
)

@router.post("/interests")
def save_interests(
    email: str,
    request: InterestRequest
):
    
    user = users_collection.find_one(
        {"email": email}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "interests": request.interests,
                "onboarding_completed": True
            }
        }
    )

    return {
        "message": "Interests saved successfully"
    }

@router.get("/recommendation")
def recommendation(email: str):
    user = users_collection.find_one(
        {"email": email}
    )
    if not user:
        raise HTTPException(
            status_code = 404,
            detail="User not found"
        )
    recommendations = get_recommendation(
        user["interests"]
    )
    return{
        "recommendations": recommendations
    }