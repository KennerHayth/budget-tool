from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Request,Users
from schemas import Requestcreate

def start_request(request_details: Requestcreate, db: Session = Depends(get_db)):
    request = Request(
        userid = request_details.userid,
        type = request_details.type,
        success = False,
        details = request_details.details
    )

    db.add(request)
    db.commit()
    db.refresh(request)
    return request

def update_request(id: int, db: Session):
    request = db.query(Request).filter(Request.requestid == id).first()
    request.success = True

    db.commit()
    db.refresh(request)
    return request

def lock_user(id:int, db: Session):
    user = db.query(Users).filter(Users.userid == id).first()
    user.locked = True
    
    db.commit()
    db.refresh(user)
    return user

def unlock_user(id:int, db: Session):
    user = db.query(Users).filter(Users.userid == id).first()
    user.locked = False
    
    db.commit()
    db.refresh(user)
    return user

