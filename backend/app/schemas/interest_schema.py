from pydantic import BaseModel

class InterestRequest(BaseModel):
    interests: list[str]