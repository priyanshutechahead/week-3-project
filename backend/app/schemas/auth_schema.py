from pydantic import BaseModel, EmailStr

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

class Userlogin(BaseModel):
    email: EmailStr
    password: str



