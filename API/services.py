from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Request,Users
from schemas import Requestcreate
import bcrypt

def start_request(request_details: Requestcreate, db: Session):
    request = Request(
        userid = request_details.userid,
        type = request_details.type,
        success = False,
        details = request_details.details
    )

    db.add(request)
    db.flush()
    db.refresh(request)
    return request

def update_request(id: int, db: Session):
    request = db.query(Request).filter(Request.requestid == id).first()

    if not request:
        return None

    request.success = True

    db.flush()
    db.refresh(request)
    return request

def lock_user(id:int, db: Session):
    user = db.query(Users).filter(Users.userid == id).first()

    if not user:
        return "invalid"

    user.locked = True
    
    db.commit()
    db.refresh(user)
    return user

def unlock_user(id:int, db: Session):
    user = db.query(Users).filter(Users.userid == id).first()
    
    if not user:
        return "invalid"

    user.locked = False
    
    db.commit()
    db.refresh(user)
    return user

def verify_login(username:str, password:str, db:Session):
    user = db.query(Users).filter(Users.user == username).first()

    if not user:
        return "invalid"

    verified = bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8"))

    if not verified:
        return "invalid"
    
    if user.locked:
        return "locked"

    return "success"
