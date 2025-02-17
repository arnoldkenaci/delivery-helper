import requests
from fastapi import HTTPException
from app.schemas.locations import StartLocation

GRAPHHOPPER_URL = "http://localhost:8989/route"


class RoutingService:
    def get_shortest_route(self, start_location: StartLocation):
        payload = {
            "points": [[start_location.longitude, start_location.latitude]],
            "profile": "car",
            "points_encoded": False,
        }

        response = requests.get(GRAPHHOPPER_URL, params=payload)

        if response.status_code != 200:
            raise HTTPException(
                status_code=500, detail="Error fetching route from GraphHopper"
            )

        return response.json()
