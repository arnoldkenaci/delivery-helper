from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.routes import groups, delivery

app = FastAPI()

# CORS setup
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(groups.router)
app.include_router(delivery.router)
