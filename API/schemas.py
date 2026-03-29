from pydantic import BaseModel

class Usercreate(BaseModel):
    user:str
    password:str
    locked:bool = False
    Admin:bool = False

class Requestcreate(BaseModel):
    userid:int
    type:str
    success:bool = False
    details:str