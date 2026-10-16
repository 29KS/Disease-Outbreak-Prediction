from fastapi import HTTPException

from app.repositories.user_repository import (
    find_by_email,
    insert_user
)

from app.utils.password import hash_password

from app.utils.password import verify_password

from app.utils.jwt_handler import create_access_token


from app.models.user_model import create_user_document


def register_user(user):

    # Duplicate Email

    existing = find_by_email(user.email)

    if existing:

        raise HTTPException(

            status_code=409,

            detail="Email already registered"

        )

    # Hash Password

    hashed = hash_password(user.password)

    # Mongo Document

    document = create_user_document(

        user,

        hashed

    )

    result = insert_user(document)

    return {

        "success": True,

        "message": "Registration Successful",

        "user_id": str(result.inserted_id)

    }

def login_user(user):

    # Find user
    db_user = find_by_email(user.email)

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="email does not exist"
        )

    # Verify password
    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    # Generate JWT Token
    token = create_access_token(db_user)

    # Return Response
    return {
        "success": True,
        "message": "Login Successful",
        "access_token": token,
        "token_type": "Bearer",
        "user": {
            "id": str(db_user["_id"]),
            "name": db_user["full_name"],
            "email": db_user["email"],
            "role": db_user["role"]
        }
    }