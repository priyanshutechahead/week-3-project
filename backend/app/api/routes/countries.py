from fastapi import APIRouter, HTTPException
from typing import List, Dict
from app.schemas.country_schema import CountryOut
from app.services.country_service import CountryService
from app.services.intelligence_service import IntelligenceService
from app.services.news_service import NewsService

router = APIRouter(prefix="/countries", tags=["countries"])

@router.get("/", response_model=List[CountryOut])
async def get_countries():
    return await CountryService.get_all_countries()

@router.get("/{code}", response_model=CountryOut)
async def get_country(code: str):
    country = await CountryService.get_country_by_code(code)
    if not country:
        raise HTTPException(status_code=404, detail="Country not found")
    return country

@router.get("/intelligence/{name}", response_model=Dict)
async def get_intelligence(name: str):
    data = await IntelligenceService.get_country_intelligence(name)
    if not data:
        raise HTTPException(status_code=500, detail="Failed to distill intelligence")
    return data

@router.get("/news/{name}", response_model=List[Dict])
async def get_news(name: str):
    data = await NewsService.get_travel_news(name)
    return data
