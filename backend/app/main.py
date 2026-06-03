from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Discoverly backend is running"}