from datetime import datetime


def create_user_document(user, hashed_password):

    return {

        "full_name": user.full_name,

        "email": user.email,

        "phone": user.phone,

        "password": hashed_password,

        "gender": user.gender,

        "age": user.age,

        "state": user.state,

        "city": user.city,

        "role": "USER",

        "alert_enabled": True,

        "created_at": datetime.utcnow(),

        "updated_at": datetime.utcnow()

    }