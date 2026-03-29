from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

Database ="postgresql://postgres:DDammit12!!@localhost:5432/finance"

engine = create_engine(Database)
SessionLocal = sessionmaker(bind=engine)
base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()