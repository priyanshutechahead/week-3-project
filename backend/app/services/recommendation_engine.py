from app.core.db import db
from datetime import datetime
from bson import ObjectId

class RecommendationService:
    collection = db["recommendations"]

    @classmethod
    async def get_user_feed(cls, user_id: str):
        cursor = cls.collection.find({"user_id": ObjectId(user_id)}).sort("timestamp", -1)
        feed = list(cursor)
        for item in feed:
            item["id"] = str(item["_id"])
            item["user_id"] = str(item["user_id"])
        return feed

    @classmethod
    async def add_recommendation(cls, user_id: str, data: dict):
        data["user_id"] = ObjectId(user_id)
        data["timestamp"] = datetime.utcnow()
        result = cls.collection.insert_one(data)
        return str(result.inserted_id)
