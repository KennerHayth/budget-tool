from pydantic import BaseModel,EmailStr

class Usercreate(BaseModel):
    user:EmailStr
    password:str
    locked:bool = False
    Admin:bool = False
    first_name: str
    last_name:str

class Requestcreate(BaseModel):
    userid:int
    type:str
    success:bool = False
    details:str

class LoginRequest(BaseModel):
    username: str
    password: str

class Budgetcreate(BaseModel):
    userid:int
    budgetid:int
    name:str

class Categorycreate(BaseModel):
    budgetid:int
    category: str
    allocation:int