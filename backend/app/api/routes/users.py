from fastapi import APIRouter, HTTPException
from app.core.db import users_collection
from app.services.recommendation_service import get_recommendations

router = APIRouter(
    prefix= "/user",
    tags=["User"]
)

@router.get("/recommendations")
def recommendations(email: str):

    user = users_collection.find_one(
        {"email": email}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user_preferences = {

        "selected_countries":
        user.get(
            "selected_countries",
            []
        ),

        "preferred_seasons":
        user.get(
            "preferred_seasons",
            []
        ),

        "preferred_categories":
        user.get(
            "preferred_categories",
            []
        ),

        "preferred_terrains":
        user.get(
            "preferred_terrains",
            []
        )
    }

    recommendations = get_recommendations(
        user_preferences
    )

    if not recommendations:

        return {
            "top_country": None,
            "recommended_countries": []
        }

    # First selected country becomes hero country

    if user_preferences["selected_countries"]:

        top_country = (
            user_preferences[
                "selected_countries"
            ][0]
        )

    else:

        top_country = (
            recommendations[0]["country"]
        )

    recommended_countries = []

    for country in recommendations:

        if country["country"] != top_country:

            recommended_countries.append(
                country["country"]
            )

    return {

        "top_country":
        top_country,

        "recommended_countries":
        recommended_countries[:4]
    }