from app.models import Group, DeliveryPoint
from uuid import uuid4


# Service functions
def create_group(name: str) -> Group:
    group_id = str(uuid4())
    new_group = Group(id=group_id, name=name)
    return new_group


def assign_locations(group, locations):
    for location in locations:
        point_id = str(uuid4())
        delivery_point = DeliveryPoint(id=point_id, location=location)
        group.delivery_points.append(delivery_point)
    return group
