from pydantic import BaseModel
from typing import List, Dict, Optional

class CountryMetadata(BaseModel):
    population: str
    language: str
    currency: str
    timezone: str

class CountryStats(BaseModel):
    tech_innovation: Dict
    cultural_heritage: Dict
    food_cuisine: Dict
    cleanliness: Dict
    safety: Dict

class CountryBase(BaseModel):
    name: str
    code: str
    metadata: CountryMetadata
    stats: CountryStats
    images: List[str]

class CountryOut(CountryBase):
    id: str

    class Config:
        from_attributes = True
