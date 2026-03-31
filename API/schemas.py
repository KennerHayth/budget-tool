from pydantic import BaseModel,EmailStr

class Usercreate(BaseModel):
    user:EmailStr
    password:str
    locked:bool = False
    Admin:bool = False

class Requestcreate(BaseModel):
    userid:int
    type:str
    success:bool = False
    details:str