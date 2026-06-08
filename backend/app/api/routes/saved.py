from fastapi import APIRouter, Depends
from typing import List
from app.models.saved_country_model import SavedCountryModel
from app.core.security import get_current_user_id

router = APIRouter(prefix="/saved", tags=["saved"])

@router.get("/")
async def get_saved_countries(user_id: str = Depends(get_current_user_id)):
    saved = await SavedCountryModel.get_user_saved(user_id)
    for s in saved:
        s["id"] = str(s["_id"])
        s["user_id"] = str(s["user_id"])
    return saved

@router.post("/")
async def save_country(country_data: dict, user_id: str = Depends(get_current_user_id)):
    # Basic implementation, can be refined with schemas later
    saved_id = await SavedCountryModel.save_country(user_id, country_data)
    return {"saved_id": saved_id, "message": "Country saved successfully"}
