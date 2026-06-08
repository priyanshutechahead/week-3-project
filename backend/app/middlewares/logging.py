import time
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("api_logger")

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Log request details
        logger.info(f"Incoming request: {request.method} {request.url.path}")
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = str(process_time)
        
        # Log response details
        logger.info(
            f"Completed request: {request.method} {request.url.path} "
            f"Status: {response.status_code} "
            f"Took: {process_time:.4f}s"
        )
        
        return response
