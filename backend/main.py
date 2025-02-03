import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

GRAPHOPPER_ROUTE_URL = "http://localhost:8989"

# Mock locations stored in a dictionary
mock_locations: Dict[str, Dict[str, float]] = {
    "Sarandë City Center": {"latitude": 39.8750, "longitude": 20.0050},
    "Port of Sarandë": {"latitude": 39.8700, "longitude": 20.0075},
    "Lëkurësi Castle": {"latitude": 39.8807, "longitude": 20.0183},
    "Mirror Beach": {"latitude": 39.8295, "longitude": 20.0248},
    "Ksamil Beach": {"latitude": 39.7686, "longitude": 20.0010},
    "Butrint National Park": {"latitude": 39.7454, "longitude": 20.0208},
}


class Location(BaseModel):
    latitude: float
    longitude: float


class RouteRequest(BaseModel):
    start_location: Location


@app.get("/locations")
def get_locations():
    """Returns all stored mock locations."""
    return mock_locations


@app.post("/shortest-route")
def get_shortest_route(request: RouteRequest):
    """Finds the shortest route from the user's location to all mock locations."""
    if not mock_locations:
        raise HTTPException(status_code=400, detail="No locations available.")

    # Prepare locations for GraphHopper API
    waypoints = [
        {"latitude": loc["latitude"], "longitude": loc["longitude"]}
        for loc in mock_locations.values()
    ]
    waypoints.insert(
        0,
        {
            "latitude": request.start_location.latitude,
            "longitude": request.start_location.longitude,
        },
    )  # Start location

    # Construct GraphHopper request URL
    route_url = f"{GRAPHOPPER_ROUTE_URL}/route?profile=car&points_encoded=false"
    for point in waypoints:
        route_url += f"&point={point['latitude']},{point['longitude']}"

    # Call GraphHopper API
    response = requests.get(route_url)
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="Error fetching route from GraphHopper",
        )
    return response.json()  # Return the optimized route
