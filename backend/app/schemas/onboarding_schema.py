from pydantic import BaseModel

class OnboardingRequest(BaseModel):
    selected_countries: list[str]
    preferred_season: list[str]
    preferred_categories: list[str]
    preferred_terrains: list[str]