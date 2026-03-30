from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Users
from schemas import Usercreate
from services import verify_login

router = APIRouter(prefix="/user", tags=["Users"])


# @router.get("/users")
# def get_users(db:Session=Depends(get_db)):
#     users = db.query(Users).all()
#     if not users:
#         raise HTTPException(status_code=404, detail = "no users found")
#     return users

@router.post("/create")
def create_user(newuser: Usercreate, db:Session = Depends(get_db)):

    new_user = Users(
        user= newuser.user,
        password= newuser.password,
        locked = newuser.locked
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




















































