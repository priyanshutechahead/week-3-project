from pymongo import MongoClient
import certifi
from app.core.config import settings

client = MongoClient(settings.MONGO_URL, tlsCAFile=certifi.where())
db = client[settings.DATABASE_NAME]