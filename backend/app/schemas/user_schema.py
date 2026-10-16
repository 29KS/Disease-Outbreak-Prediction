from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Literal
import re


class RegisterUser(BaseModel):

    full_name: str = Field(..., min_length=3, max_length=50)

    email: EmailStr

    phone: str

    password: str

    gender: Literal["Male", "Female", "Other"]

    age: int = Field(..., ge=1, le=120)

    state: str

    city: str

    # -----------------------------
    # Full Name Validation
    # -----------------------------
    @field_validator("full_name")
    @classmethod
    def validate_name(cls, value):

        value = value.strip()

        if not re.match(r"^[A-Za-z ]+$", value):
            raise ValueError(
                "Name should contain only alphabets and spaces"
            )
        if len(value) < 3:
             raise ValueError("Name must be at least 3 characters")
        
        return value

    # -----------------------------
    # Phone Validation
    # -----------------------------
    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):

        if not value.isdigit():
            raise ValueError(
                "Phone number should contain only digits"
            )

        if len(value) != 10:
            raise ValueError(
                "Phone number must be exactly 10 digits"
            )

        return value

    # -----------------------------
    # Password Validation
    # -----------------------------
    @field_validator("password")
    @classmethod
    def validate_password(cls, value):

        if len(value) < 8:
            raise ValueError(
                "Password must be at least 8 characters"
            )

        if not re.search(r"[A-Z]", value):
            raise ValueError(
                "Password must contain one uppercase letter"
            )

        if not re.search(r"[a-z]", value):
            raise ValueError(
                "Password must contain one lowercase letter"
            )

        if not re.search(r"\d", value):
            raise ValueError(
                "Password must contain one digit"
            )

        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise ValueError(
                "Password must contain one special character"
            )

        return value
    
    @field_validator("state")
    @classmethod
    def validate_state(cls, value):

        value = value.strip()

        if len(value) < 2:
            raise ValueError("Invalid state")

        return value
    
    @field_validator("city")
    @classmethod
    def validate_city(cls, value):

        value = value.strip()

        if len(value) < 2:
            raise ValueError("Invalid city")

        return value 