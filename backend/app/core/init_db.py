from app.core.db import db
import logging

logger = logging.getLogger(__name__)

def setup_indexes():
    try:
        logger.info("Setting up database indexes...")
        
        # Ensure unique email index for users
        db.users.create_index("email", unique=True)
        
        # Additional indexes can be added here
        # db.countries.create_index("code", unique=True)
        
        logger.info("Database indexes ensured successfully.")
    except Exception as e:
        logger.error(f"Failed to setup database indexes: {str(e)}")
        # In a real production app, you might want to exit here if indexes are critical
