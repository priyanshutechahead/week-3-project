from pydantic import BaseModel, EmailStr

class UserSignup(Basemodel):
    name: str
    email: EmailStr
    password: str

class Userlogin(BaseModel):
    email: EmailStr
    password: str



