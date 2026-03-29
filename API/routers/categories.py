from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Categories

router = APIRouter(prefix="/budgets/details", tags=["Categories"])

@router.get("/{budgetid}")
def get_budget_details(budgetid:int, db:Session = Depends(get_db)):
    details = db.query(Categories).filter(Categories.budgetid == budgetid).all()
    if not details:
        raise HTTPException(status_code=404, detail="budget details not found")
    return details