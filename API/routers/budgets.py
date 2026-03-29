from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Budgets
from models import Categories

router = APIRouter(prefix="/budgets", tags=["Budgets"])

@router.get("/{userid}")
def get_budgets(userid:int, db:Session = Depends(get_db)):
    budgets = db.query(Budgets).filter(Budgets.userid == userid).all()
    if not budgets:
        raise HTTPException(status_code=404, detail="budget not found")
    return budgets

