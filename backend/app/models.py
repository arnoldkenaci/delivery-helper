from pydantic import BaseModel
from typing import List


class Location(BaseModel):
    latitude: float
    longitude: float


class DeliveryPoint(BaseModel):
    id: str
    location: Location
    delivered: bool = False


class Group(BaseModel):
    id: str
    name: str
    delivery_points: List[DeliveryPoint] = []
