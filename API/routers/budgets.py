from fastapi import APIRouter,Depends,HTTPException,Response,Request
from sqlalchemy.orm import Session
from database import get_db
from models import Budgets
from models import Categories
from schemas import Budgetcreate
from jose import jwt

router = APIRouter(prefix="/budgets", tags=["Budgets"])

key = "generate this"

ALGORITHM = "HS256"

@router.get("/{userid}")
def get_budgets(userid:int, db:Session = Depends(get_db)):
    budgets = db.query(Budgets).filter(Budgets.userid == userid).all()
    if not budgets:
        raise HTTPException(status_code=404, detail="budget not found")
    return budgets

@router.post("/create")
def get_budgets(newbudget: Budgetcreate, db:Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    try:
        payload = jwt.decode(token, key, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except:
        raise HTTPException(detail="Token not found", status_code=404)

    budget = newbudget(    
    userid = user_id,
    name= newbudget.name)

    db.add(budget)
    db.commit()
    db.refresh
    return budget


