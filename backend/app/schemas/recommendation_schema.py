from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RecommendationBase(BaseModel):
    category: str
    title: str
    description: str
    source: str
    image_url: Optional[str] = None
    relevance_score: Optional[float] = 0.0

class RecommendationOut(RecommendationBase):
    id: str
    user_id: str
    timestamp: datetime

    class Config:
        from_attributes = True
