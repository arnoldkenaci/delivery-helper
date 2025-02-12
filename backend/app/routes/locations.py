from fastapi import APIRouter
from app.models.locations import Location
from app.services.locations import LocationService

router = APIRouter()
location_service = LocationService()


@router.get("/")
def get_locations():
    return location_service.get_all()


@router.post("/")
def add_location(location: Location):
    return location_service.add(location)


@router.put("/{location_name}")
def update_location(location_name: str, location: Location):
    return location_service.update(location_name, location)


@router.delete("/{location_name}")
def delete_location(location_name: str):
    return location_service.delete(location_name)
