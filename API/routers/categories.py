from fastapi import APIRouter,Depends,HTTPException,Response,Request
from jose import jwt
from sqlalchemy.orm import Session
from database import get_db
from models import Categories,Users,Budgets
from schemas import Categorycreate
router = APIRouter(prefix="/budgets/details", tags=["Categories"])

key = "generate this"

ALGORITHM = "HS256"

@router.get("/{budgetid}")
def get_budget_details(budgetid:int,request:Request, db:Session = Depends(get_db)):
    
# Known issue correct for proper security (check for user to be related to the budgetid)
    
    token = request.cookies.get("access_token")
    try:
        payload = jwt.decode(token, key, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except:
        raise HTTPException(detail="Token not found", status_code=404)

    owner = db.query(Budgets).filter(Budgets.userid == user_id and Budgets.budgetid ==budgetid).all()
    if not owner:
        raise HTTPException(status_code=450, detail="request has not been authorized")
    
# Known issue correct for proper security (check for user to be related to the budgetid)


    details = db.query(Categories).filter(Categories.budgetid == budgetid).all()
    if not details:
        raise HTTPException(status_code=404, detail="budget details not found")
    return details

# update to allow for multiple categories to be added at one time
# also account for - all budgets owned by a user must contain the same categories 
# (this is to prevent unallocated funds when switching between budgets or orphaned transactions during deletion)
@router.post("/new")
def create_category(newcategory: Categorycreate,request:Request, db:Session = Depends(get_db)):    
    # check for valid request data (current state is to check for existance)
    if not newcategory.category or not newcategory.allocation:
        HTTPException(status_code=402, detail="incomplete request, please fill out all required fields")
   
    # verify user is the owner of the budget (or authorized in future state)

# Known issue correct for proper security (check for user to be related to the budgetid)
    
    token = request.cookies.get("access_token")
    try:
        payload = jwt.decode(token, key, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except:
        raise HTTPException(detail="Token not found", status_code=401)

    owner = db.query(Budgets).filter(Budgets.userid == user_id and Budgets.budgetid ==newcategory.budgetid).all()
    if not owner:
        raise HTTPException(status_code=450, detail="request has not been authorized")
    
# Known issue correct for proper security (check for user to be related to the budgetid)

    # create the budget line
    category = newcategory(    
    budgetid = newcategory.budgetid,
    category = newcategory.category,
    allocation= newcategory.allocation)

    # commit budget line to database
    db.add(category)
    db.commit()
    db.refresh

    # refresh/return data to webpage (bottom center of the table a "save changes" button should appear, once clicked, trigger this process)
    all_categories = db.query(Categories).filter(Categories.budgetid == newcategory.budgetid).all()
    return all_categories


@router.post("")
def edit_budget_details(Table,request:Request, db:Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    try:
        payload = jwt.decode(token, key, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except:
        raise HTTPException(detail="Token not found", status_code=401)
        
    # check for the budget to exist and is related to the user

    # quick check that data is valid (exist, correct data type,etc)

    # check that all the categories that show in the table exist in both the table and the DB (make them match), while doing this check for duplicates

    # check that all allocations match for the categoryid + budgetid combo