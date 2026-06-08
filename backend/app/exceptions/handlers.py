from fastapi import Request, status
from fastapi.responses import JSONResponse
from pymongo.errors import PyMongoError
import logging

logger = logging.getLogger(__name__)

async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global error caught: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred. Please try again later.",
            "details": str(exc) if True else None  # Set to False in real production for security
        }
    )

async def pymongo_exception_handler(request: Request, exc: PyMongoError):
    logger.error(f"Database error caught: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={
            "error": "Database Error",
            "message": "The database is currently unavailable or the operation failed.",
            "details": str(exc) if True else None
        }
    )
