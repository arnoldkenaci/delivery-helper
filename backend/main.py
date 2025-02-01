import os
import requests
from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

# MongoDB setup
client = AsyncIOMotorClient("mongodb://mongodb:27017")
db = client.delivery_app

# GraphHopper API settings
GRAPHHOPPER_API_KEY = os.getenv("GRAPHHOPPER_API_KEY", "your-api-key")
GRAPHHOPPER_BASE_URL = "https://graphhopper.com/api/1/route"

@app.post("/locations")
async def add_location(location: dict):
    """Add a delivery location."""
    result = await db.locations.insert_one(location)
    return {"inserted_id": str(result.inserted_id)}

@app.get("/locations")
async def list_locations():
    """List all delivery locations."""
    locations = await db.locations.find().to_list(100)
    return {"locations": locations}

@app.get("/route")
async def get_optimized_route():
    """Fetch optimized route from GraphHopper."""
    # Fetch delivery locations from MongoDB
    locations = await db.locations.find().to_list(100)
    if not locations:
        raise HTTPException(status_code=404, detail="No locations found")

    # Build waypoints for the request
    points = [
        f"{loc['latitude']},{loc['longitude']}" for loc in locations
    ]

    # Build request URL
    params = {
        "point": points,
        "vehicle": "car",
        "locale": "en",
        "key": GRAPHHOPPER_API_KEY,
        "instructions": "false"
    }
    response = requests.get(GRAPHHOPPER_BASE_URL, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to get route")

    return response.json()
