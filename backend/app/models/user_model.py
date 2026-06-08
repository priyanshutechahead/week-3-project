from app.core.db import db
from bson import ObjectId
from datetime import datetime

class UserModel:
    collection = db["users"]

    @classmethod
    async def create_user(cls, user_data: dict):
        user_data["created_at"] = datetime.utcnow()
        result = cls.collection.insert_one(user_data)
        return str(result.inserted_id)

    @classmethod
    async def get_by_email(cls, email: str):
        return cls.collection.find_one({"email": email})

    @classmethod
    async def get_by_id(cls, user_id: str):
        return cls.collection.find_one({"_id": ObjectId(user_id)})

    @classmethod
    async def update_user(cls, user_id: str, update_data: dict):
        cls.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
