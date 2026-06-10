import firebase_admin
from firebase_admin import credentials, auth
import os
import json

# Initialize Firebase Admin
if not firebase_admin._apps:
    firebase_creds_json = os.getenv("FIREBASE_CREDENTIALS")
    if firebase_creds_json:
        try:
            cred_dict = json.loads(firebase_creds_json)
            cred = credentials.Certificate(cred_dict)
        except Exception as e:
            print(f"Error parsing FIREBASE_CREDENTIALS env var: {e}")
            # Fallback to file if parsing fails
            cred = credentials.Certificate("app/auth.json")
    else:
        # Look for the file
        cred_path = "app/auth.json"
        if not os.path.exists(cred_path):
            # Try absolute path from backend root if relative fails
            cred_path = os.path.join(os.path.dirname(__file__), "..", "auth.json")
        
        try:
            cred = credentials.Certificate(cred_path)
        except Exception as e:
            print(f"CRITICAL: Firebase credentials not found at {cred_path}")
            # We don't raise here to allow the app to start, but auth will fail
            cred = None

    if cred:
        firebase_admin.initialize_app(cred)

def verify_google_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token, None
    except Exception as e:
        print(f"Error verifying token: {e}")
        return None, str(e)
