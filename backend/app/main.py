from fastapi import FastAPI
from app.core.db import db
from app.api.routes.auth import router as auth_router
from app.api.routes.users import router as user_router
from app.api.routes.countries import router as country_router
from app.api.routes.saved_country import router as saved_country_router


app = FastAPI(
    title="Discoverly API",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(country_router)
app.include_router(saved_country_router)

@app.get("/")
def root():
    return {"message": "Discoverly backend is running"}


@app.get("/test-db")
def test_db():
    try:
        db.test.insert_one({"status": "connected"})
        return {"message": "MongoDB connected"}
    except Exception as e:
        return {
            "message": "DB Connection failed",
            "error": str(e)
        }
