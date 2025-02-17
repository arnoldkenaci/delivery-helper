from fastapi import APIRouter
from app.schemas.locations import StartLocation
from app.services.routing import RoutingService

router = APIRouter()
routing_service = RoutingService()


@router.post("/shortest-route")
def shortest_route(start_location: StartLocation):
    return routing_service.get_shortest_route(start_location)
