from fastapi import APIRouter, HTTPException
from app.core.db import users_collection
from app.schemas.onboarding_schema import OnboardingRequest

router = APIRouter(
    prefix="/onboarding",
    tags=["Onboarding"]
)

@router.post("/")
def complete_onboarding(email:str, request: OnboardingRequest):
    user = users_collection.find_one(
        {"email": email}
    )

    if not user:
        raise HTTPException(
            status_code = 404,
            details = "User not found"
        )
    users_collection.update_one(
        {"email": email},
        {"$set":{
            "selected_countries": request.selected_countries,
            "preferred_season": request.preferred_season,
            "preferred_categories": request.preferred_categories,
            "preferred_terrains": request.preferred_terrains,
            "onboarding_completed": True
        }
        }
    )
    return{
        "message": "Onboarding completed sucessfully"
    }