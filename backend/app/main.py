from fastapi import FastAPI

from app.routes.auth import router as auth_router

app = FastAPI(
    title="Early Disease Outbreak Detection API",
    version="1.0.0"
)

app.include_router(auth_router)


@app.get("/")
def home():

    return {

        "message": "API Running Successfully"

    }