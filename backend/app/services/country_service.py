from app.core.db import db
from bson import ObjectId

class CountryService:
    collection = db["countries"]

    @classmethod
    async def get_all_countries(cls):
        cursor = cls.collection.find()
        countries = list(cursor)
        for c in countries:
            c["id"] = str(c["_id"])
        return countries

    @classmethod
    async def get_country_by_code(cls, code: str):
        country = cls.collection.find_one({"code": code.upper()})
        if country:
            country["id"] = str(country["_id"])
        return country
