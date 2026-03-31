from sqlalchemy.orm import Mapped, mapped_column
from database import base
from datetime import datetime, timezone

class Users(base):
    __tablename__ = "Users"

    user: Mapped[str] = mapped_column(unique=True)
    userid: Mapped[int] = mapped_column(primary_key=True, index=True)
    locked: Mapped[bool]= mapped_column(default=False, server_default="false")
    password: Mapped[str]
    admin: Mapped[bool]= mapped_column(default=False, server_default="false")

class Transaction(base):
    __tablename__ = "Transactions"

    transactionid:Mapped[int]= mapped_column(primary_key=True, index=True)
    userid:Mapped[int] = mapped_column(index=True)
    date:Mapped[datetime] = mapped_column(default=datetime.now(timezone.utc))
    type:Mapped[str]= mapped_column(index=True)
    amount:Mapped[int]
    description:Mapped[str]


class Budgets(base):
    __tablename__ = "Budgets"

    userid:Mapped[int] = mapped_column(index=True)
    budgetid:Mapped[int] = mapped_column(primary_key=True, index=True)
    name:Mapped[str] 


class Categories(base):
    __tablename__ = "Categories"
    categoryid: Mapped[int] = mapped_column(primary_key=True, index=True)
    budgetid: Mapped[int] = mapped_column(index=True)
    category: Mapped[str] = mapped_column(index=True)
    amount: Mapped[int]

class Request(base):
    __tablename__ = "Request"
    requestid: Mapped[int] = mapped_column(primary_key=True, index=True)
    userid: Mapped[int] = mapped_column(index=True)
    type: Mapped[str] = mapped_column(index=True)
    success: Mapped[bool] = mapped_column(index=True)
    details: Mapped[int]