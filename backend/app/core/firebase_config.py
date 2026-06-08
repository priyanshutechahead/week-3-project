import firebase_admin
from firebase_admin import credentials, auth
import os

# Initialize Firebase Admin
if not firebase_admin._apps:
    cred = credentials.Certificate("app/auth.json")
    firebase_admin.initialize_app(cred)

def verify_google_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token, None
    except Exception as e:
        print(f"Error verifying token: {e}")
        return None, str(e)
