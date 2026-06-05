from fastapi import APIRouter, HTTPException
from app.core.db import users_collection
from app.schemas.saved_country_schema import SavedCountryRequest

router = APIRouter(
    prefix="/saved-country",
    tags=["Saved Countries"]
)

@router.post("/")
def save_country( email: str, request: SavedCountryRequest):
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
            "$addToSet": {
                "saved_countries": request.country_name
            }
        }
    )
    return {
        "message": "Country Saved Successfully"
    }

@router.get("/")
def get_saved_countries(email:str):
    user = users_collection.find_one(
        {"email": email}
    )
    if not user:
        raise HTTPException(
            status_code= 404,
            detail= "User not found"
        )
    return {
        "saved_countries": user.get("saved_countries", [])
    }