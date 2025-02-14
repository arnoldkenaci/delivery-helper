from pydantic import BaseModel
from typing import List, Optional


class Location(BaseModel):
    id: Optional[int] = None
    name: str
    latitude: float
    longitude: float
    address: Optional[str] = None
    contact_phone: Optional[str] = None
    priority: Optional[int] = 1  # 1 = highest priority, default is lowest
    delivery_window: Optional[List[str]] = (
        None  # Example: ["08:00-12:00", "14:00-18:00"]
    )
    notes: Optional[str] = None


class StartLocation(BaseModel):
    latitude: float
    longitude: float
