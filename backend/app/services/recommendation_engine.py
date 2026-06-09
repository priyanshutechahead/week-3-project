from app.core.db import db
from datetime import datetime
from bson import ObjectId
import json
import os
from app.models.user_model import UserModel

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

    @classmethod
    async def generate_personalized_recommendations(cls, user_id: str):
        user = await UserModel.get_by_id(user_id)
        if not user:
            return None

        interests = user.get("interests", {})
        user_seasons = set(interests.get("seasons", []))
        user_flora = set(interests.get("flora_fauna", []))
        user_landscapes = set(interests.get("landscapes", []))
        user_countries = interests.get("countries", [])
        
        main_country = user_countries[0] if user_countries else None

        file_path = os.path.join(os.path.dirname(__file__), "..", "data", "countries_metadata.json")
        with open(file_path, "r", encoding="utf-8") as f:
            countries_data = json.load(f)

        scored_countries = []
        for c in countries_data:
            c_seasons = set(c.get("seasons", []))
            c_flora = set(c.get("FloraFauna", []))
            c_landscapes = set(c.get("Landscape", []))

            score = 0
            max_possible = len(user_seasons) + len(user_flora) + len(user_landscapes)
            
            if max_possible > 0:
                score += len(user_seasons.intersection(c_seasons))
                score += len(user_flora.intersection(c_flora))
                score += len(user_landscapes.intersection(c_landscapes))
                match_percentage = int((score / max_possible) * 100)
            else:
                match_percentage = 0

            scored_countries.append({
                "country": c["country"],
                "match_percentage": match_percentage,
                "seasons": list(c_seasons),
                "flora_fauna": list(c_flora),
                "landscapes": list(c_landscapes)
            })

        # Separate main country if selected, else sort by match
        if main_country:
            main_data = next((c for c in scored_countries if c["country"] == main_country), None)
            if not main_data:
                # Fallback if selected country is not in metadata
                scored_countries.sort(key=lambda x: x["match_percentage"], reverse=True)
                main_data = scored_countries[0]
                suggestions = scored_countries[1:5]
            else:
                # Filter out the main country from suggestions
                suggestions = [c for c in scored_countries if c["country"] != main_country]
                suggestions.sort(key=lambda x: x["match_percentage"], reverse=True)
                suggestions = suggestions[:4]
        else:
            scored_countries.sort(key=lambda x: x["match_percentage"], reverse=True)
            main_data = scored_countries[0] if scored_countries else None
            suggestions = scored_countries[1:5] if len(scored_countries) > 1 else []

        return {
            "main": main_data,
            "suggestions": suggestions
        }
