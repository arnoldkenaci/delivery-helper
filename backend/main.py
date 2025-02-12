from fastapi import FastAPI
from app.routes import locations, routing

app = FastAPI(title="Delivery Routing API")

# # Register API endpoints
app.include_router(locations.router, prefix="/locations", tags=["Locations"])
app.include_router(routing.router, prefix="/routes", tags=["Routing"])


@app.get("/")
def home():
    return {"message": "Welcome to the Delivery Routing API"}
