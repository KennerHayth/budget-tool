from fastapi import APIRouter,Depends,HTTPException,Response,Request
from jose import jwt
from sqlalchemy.orm import Session
from database import get_db
from models import Categories,Users,Budgets,Allocations
from schemas import BudgetUpdateRequest
router = APIRouter(prefix="/budgets/details", tags=["Categories"])

key = "generate this"

ALGORITHM = "HS256"

@router.get("/{budgetid}")
def get_budget_details(budgetid: int, request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    try:
        payload = jwt.decode(token, key, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except:
        raise HTTPException(detail="Token not found", status_code=404)

    access_check = db.query(Budgets).filter(Budgets.userid == user_id).all()
    if not access_check:
        raise HTTPException(status_code=401, detail="unauthorized")

    results = db.query(Categories, Allocations).join(
        Allocations, Allocations.categoryid == Categories.categoryid
    ).filter(
        Allocations.budgetid == budgetid,
        Categories.userid == user_id
    ).all()

    if not results:
        return

    return [
        {
            "categoryID": category.categoryid,
            "category": category.category,
            "allocation": allocation.allocation
        }
        for category, allocation in results
    ]



@router.post("")
def edit_budget_details(request_body: BudgetUpdateRequest,request:Request, db:Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    try:
        payload = jwt.decode(token, key, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except:
        raise HTTPException(detail="Token not found", status_code=401)
        

    # check for the budget to exist and is related to the user    

    details = request_body.details      
    budgetID = request_body.budgetID

    if not details:
        raise HTTPException(status_code=404,detail="incomplete request")



    db_categories = db.query(Categories).filter(Categories.userid == user_id).all()
    db_map = {row.categoryid: row for row in db_categories}
    payload_ids = {row.categoryID for row in details if row.categoryID > 0}


    budget_list = db.query(Budgets).filter(Budgets.userid == user_id)

    budget_map = {row.budgetid for row in budget_list}


    for ID in db_map:
        if ID not in payload_ids:
            db.query(Allocations).filter(
                Allocations.categoryid == ID
            ).delete()

            db.query(Categories).filter(
                Categories.categoryid == ID
            ).delete()

    for row in details:
        if row.categoryID > 0 and row.categoryID in db_map:
            existing_cat = db_map[row.categoryID]
            existing_cat.category = row.category

            existing_allocation = db.query(Allocations).filter(
                Allocations.categoryid == row.categoryID,
                Allocations.budgetid == budgetID
            ).first()
            if existing_allocation:
                existing_allocation.allocation=row.allocation

    for row in details:
        if row.categoryID < 0:
            new_cat = Categories(
                userid = user_id,
                category = row.category
            )
            db.add(new_cat)
            db.flush()

            new_allocation = Allocations(
                budgetid = budgetID,
                categoryid = new_cat.categoryid,
                allocation = row.allocation
            )
            db.add(new_allocation)

            for otherbudget in budget_map:
                if otherbudget != budgetID:
                    matching_allocation = Allocations(
                    budgetid = otherbudget,
                    categoryid = new_cat.categoryid,
                    allocation = 0
                    )     
                    db.add(matching_allocation)

    db.commit()


