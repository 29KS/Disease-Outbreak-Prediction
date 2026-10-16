from fastapi import APIRouter

from app.schemas.user_schema import RegisterUser

from app.services.auth_service import register_user

from app.schemas.login_schema import LoginUser

from app.services.auth_service import login_user


router = APIRouter(

    prefix="/auth",

    tags=["Authentication"]

)


@router.post("/register")

def register(user: RegisterUser):

    return register_user(user)


@router.post("/login")

def login(user: LoginUser):

    return login_user(user)