import bcrypt
from fastapi import APIRouter,Depends,HTTPException,Response,Request
from sqlalchemy.orm import Session
from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta,timezone

from database import get_db
from services import verify_login, verify_user
from models import Users
from schemas import LoginRequest

router = APIRouter(prefix="/auth", tags=["Auth"])


key = "generate this"

ALGORITHM = "HS256"

def hash_password(password:str):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def create_token(user_id:int):
    payload = {
        "sub": str(user_id),
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    }
    return jwt.encode(payload,key,algorithm=ALGORITHM)


@router.post("/login")
def verify_user (data:LoginRequest,response:Response, db:Session = Depends(get_db)):
    user = verify_login(data.username,data.password,db)
    if not user:
        raise HTTPException(status_code=401, detail="invalid username or password")
    
    if user.locked:
        raise HTTPException(status_code=403, detail="your account has been locked")

    token = create_token(user.userid)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=3600,
        expires=3600,
        path="/"
    )

    return {"status": "success"}

@router.get("/me")
def me(request: Request):
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="test")

    try:
        payload = jwt.decode(token, key, algorithms=[ALGORITHM])
        return {"user_id": payload["sub"]}
    except:
        raise HTTPException(status_code=401)


# @router.post("/refresh")
# def generate_token(username:str, password:str, db:Session = Depends(get_db)):
#     user = verify_user(username,password,db)
#     if user:

#         token = create_token(user.id)
        
#         response.set_cookie(
#             key="access_token",
#             value=token,
#             httponly=True,
#             secure=True,      # True in production (HTTPS)
#             samesite="lax",
#             max_age=3600
#         )
#     return{"message" : "Login Refreshed"}






















































