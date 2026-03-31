from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Users

def get_user(id:int | str, db: Session):
    if isinstance(id, int):
        user = db.query(Users).filter(Users.userid == id).first()
        if not user:
            return False
    else:
        user = db.query(Users).filter(Users.user == id).first()
        if not user:
            return False
    return user

    