from app.core.db import db
from bson import ObjectId
from datetime import datetime

class SavedCountryModel:
    collection = db["saved_countries"]

    @classmethod
    async def save_country(cls, user_id: str, country_data: dict):
        country_data["user_id"] = ObjectId(user_id)
        country_data["created_at"] = datetime.utcnow()
        result = cls.collection.insert_one(country_data)
        return str(result.inserted_id)

    @classmethod
    async def get_user_saved(cls, user_id: str):
        cursor = cls.collection.find({"user_id": ObjectId(user_id)})
        return list(cursor)

    @classmethod
    async def update_progress(cls, saved_id: str, progress: int):
        cls.collection.update_one(
            {"_id": ObjectId(saved_id)},
            {"$set": {"progress": progress}}
        )
