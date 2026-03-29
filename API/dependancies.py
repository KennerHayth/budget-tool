from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Users

def get_user(id:int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.userid == id).first()
    if not user:
        raise HTTPException(status_code=404, detail= "user not found")
    return user

    