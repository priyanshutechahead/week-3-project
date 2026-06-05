from pydantic import BaseModel

class SavedCountryRequest(BaseModel):
    country_name: str