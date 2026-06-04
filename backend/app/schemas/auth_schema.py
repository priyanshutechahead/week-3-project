from pydantic import BaseModel, EmailStr

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    mobile_number: str
    password: str

class Userlogin(BaseModel):
    email: EmailStr
    password: str



