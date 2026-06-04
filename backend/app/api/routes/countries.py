from fastapi import APIRouter, HTTPException

from app.services.country_service import(get_country_details)

router = APIRouter(
    prefix="/country",
    tags=["Country"]
)

@router.get("/{country_name}")
def country_details(country_name: str):
    country = get_country_details(country_name)

    if not country:
        raise HTTPException(
            status_code = 404,
            detail="Country not found"
        )
    return country