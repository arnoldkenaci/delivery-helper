from fastapi import APIRouter, HTTPException
from app.models import Group
from app.database import groups
from app.services import assign_locations

router = APIRouter(prefix="/groups", tags=["Delivery"])


@router.post("/{group_id}/assign")
def assign_locations_route(group_id: str, locations: list):
    if group_id not in groups:
        raise HTTPException(status_code=404, detail="Group not found")
    group = groups[group_id]
    assign_locations(group, locations)
    return {"message": "Locations assigned successfully"}
