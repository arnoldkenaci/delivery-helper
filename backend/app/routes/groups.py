from fastapi import APIRouter, HTTPException
from app.models import Group
from app.database import groups
from app.services import create_group

router = APIRouter(prefix="/groups", tags=["Groups"])


@router.post("/")
def create_group_route(name: str):
    group = create_group(name)
    groups[group.id] = group
    return group
