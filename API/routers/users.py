import bcrypt
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Users
from schemas import Usercreate
from services import verify_login
from dependancies import get_user

router = APIRouter(prefix="/user", tags=["Users"])


# @router.get("/users")
# def get_users(db:Session=Depends(get_db)):
#     users = db.query(Users).all()
#     if not users:
#         raise HTTPException(status_code=404, detail = "no users found")
#     return users


def hash_password(password:str):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


@router.post("/create")
def create_user(newuser: Usercreate, db:Session = Depends(get_db)):

    new_user = Users(
        user= newuser.user,
        password= hash_password(newuser.password),
        locked = False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/verify")
def verify_user (username:str, password:str, db:Session = Depends(get_db)):
    status = verify_login(username,password,db)
    if status == "invalid":
        raise HTTPException(status_code=401, detail="invalid username or password")
    if status == "locked":
        raise HTTPException(status_code=403, detail="your account has been locked")
    
    return {"status": "success"}

@router.get("/existing")
def check_existing (username:str, db:Session = Depends(get_db)):
    exist = get_user(username, db)
    if exist:
        raise HTTPException(status_code=401, detail="username already in use")

    return False




















































