from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.db import db
from app.core.init_db import setup_indexes
from app.api.routes import auth, users, countries, recommendations, saved
from app.middlewares.logging import LoggingMiddleware
from app.exceptions.handlers import global_exception_handler, pymongo_exception_handler
from pymongo.errors import PyMongoError

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Setup database indexes
    setup_indexes()
    yield
    # Shutdown logic (if any) could go here
    pass

app = FastAPI(
    title="Discoverly API",
    version="1.0.0",
    lifespan=lifespan
)

# Exception handlers
app.add_exception_handler(Exception, global_exception_handler)
app.add_exception_handler(PyMongoError, pymongo_exception_handler)

# Middlewares
app.add_middleware(LoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(countries.router)
app.include_router(recommendations.router)
app.include_router(saved.router)

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