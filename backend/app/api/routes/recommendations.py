from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.recommendation_schema import RecommendationOut
from app.services.recommendation_engine import RecommendationService
from app.core.security import get_current_user_id

router = APIRouter(prefix="/recommendations", tags=["recommendations"])

@router.get("/", response_model=List[RecommendationOut])
async def get_my_feed(user_id: str = Depends(get_current_user_id)):
    return await RecommendationService.get_user_feed(user_id)

@router.get("/personalized")
async def get_personalized_recommendations(user_id: str = Depends(get_current_user_id)):
    result = await RecommendationService.generate_personalized_recommendations(user_id)
    if not result:
        raise HTTPException(status_code=404, detail="Recommendations not generated")
    return result
