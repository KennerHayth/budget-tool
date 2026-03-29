from fastapi import FastAPI
from database import base, engine
from routers import transactions,budgets,categories,users

# Creates tables if they don't exist
base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(transactions.router)
app.include_router(budgets.router)
app.include_router(categories.router)
app.include_router(users.router)
