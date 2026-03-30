from fastapi import FastAPI
from database import base, engine
from routers import transactions,budgets,categories,users
from fastapi.middleware.cors import CORSMiddleware

# Creates tables if they don't exist
base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(transactions.router)
app.include_router(budgets.router)
app.include_router(categories.router)
app.include_router(users.router)
