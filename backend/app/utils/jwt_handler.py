from jose import jwt
from datetime import datetime, timedelta

from app.config.settings import (
    JWT_SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)


def create_access_token(user):

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {

        "sub": user["email"],

        "user_id": str(user["_id"]),

        "role": user["role"],

        "exp": expire

    }

    token = jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token