from fastapi import APIRouter,Depends,HTTPException,Response,Request
from sqlalchemy.orm import Session
from database import get_db
from models import Budgets
from models import Categories,Allocations
from schemas import Budgetcreate
from jose import jwt

router = APIRouter(prefix="/budgets", tags=["Budgets"])

key = "generate this"

ALGORITHM = "HS256"

@router.get("")
def get_budgets(request:Request, db:Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    try:
        payload = jwt.decode(token, key, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except:
        raise HTTPException(detail="Token not found", status_code=401)
    
    budgets = db.query(Budgets).filter(Budgets.userid == user_id).all()
    if not budgets:
        budgets = None
    
    return budgets

# hook up "create budget" button to this servercall (using a modal to prompt the user to create a name)
@router.post("")
def create_budget(newbudget: Budgetcreate,request:Request, db:Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    try:
        payload = jwt.decode(token, key, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except:
        raise HTTPException(detail="Token not found", status_code=401)

    categories = db.query(Categories).filter(Categories.userid == user_id).all()

    budget = Budgets(    
    userid = user_id,
    name= newbudget.name)
    db.add(budget)

    db.commit()
    db.refresh(budget)

    for category in categories:
        new_category = Allocations(
        budgetid = budget.budgetid,
        categoryid = category.categoryid,
        allocation = 0,
        hidden = False
        )     
        db.add(new_category)   

    db.commit() 

    return budget

