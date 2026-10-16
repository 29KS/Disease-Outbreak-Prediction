from app.database.connection import users_collection

def find_by_email(email: str):

    return users_collection.find_one({

        "email": email

    })


def insert_user(user_data):
    return users_collection.insert_one(user_data)