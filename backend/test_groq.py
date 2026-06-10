import sys
import os
import asyncio

try:
    # pyrefly: ignore [missing-import]
    from dotenv import load_dotenv
except ImportError:
    # Resolve the local virtual environment's site-packages path relative to this file
    base_dir = os.path.abspath(os.path.dirname(__file__))
    venv_lib_dir = os.path.join(base_dir, "venv", "lib")
    if os.path.exists(venv_lib_dir):
        for version_dir in os.listdir(venv_lib_dir):
            site_pkgs = os.path.join(venv_lib_dir, version_dir, "site-packages")
            if os.path.exists(site_pkgs):
                sys.path.insert(0, site_pkgs)
    # pyrefly: ignore [missing-import]
    from dotenv import load_dotenv


# Add backend app to path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Load env variables manually from .env

load_dotenv()

from app.services.intelligence_service import IntelligenceService

async def main():
    print("Testing Groq model with China...")
    res = await IntelligenceService.get_country_intelligence("China")
    print("Result:", res)

if __name__ == "__main__":
    asyncio.run(main())
