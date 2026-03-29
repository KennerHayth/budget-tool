from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Transaction
from schemas import Requestcreate
from dependancies import get_user
from services import start_request, update_request

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.get("/{id}")
def get_transactions(id: int, db: Session = Depends(get_db)):
    user = get_user(id, db)

    # ensure the user is not locked/an admin
    if user.locked and not user.admin :
        raise HTTPException(status_code=403, detail = "user locked")

    # requset_details = Requestcreate(
    #     userid =user.userid,
    #     type = "get",
    #     success = False,
    #     details = "requesting transactions"
    # )
    # # log the request that has been made
    # request = start_request(requset_details, db)

    transactions = db.query(Transaction).filter(Transaction.userid == id).all()

    if not transactions:
        raise HTTPException(status_code=404, detail="transactions not found")
    
    # set the request as complete
    # completed_request = update_request(request.requestid, db)
    # if not completed_request:
    #     raise HTTPException(status_code= 404, detail ="error not found")


    return transactions
    


