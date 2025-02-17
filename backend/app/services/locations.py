from pymongo import MongoClient
from fastapi import HTTPException
from app.schemas.locations import Location


class LocationService:
    def __init__(self):
        # Connect to MongoDB
        self.client = MongoClient(
            "mongodb://localhost:27017"
        )  # Update if using a different connection
        self.db = self.client["delivery_helper"]
        self.collection = self.db["locations"]

    def get_all(self):
        return list(self.collection.find({}, {"_id": 0}))  # Exclude MongoDB's `_id`

    def add(self, location: Location):
        if self.collection.find_one({"name": location.name}):
            raise HTTPException(status_code=400, detail="Location already exists")

        location_dict = location.dict()
        self.collection.insert_one(location_dict)
        return {"message": f"Location '{location.name}' added successfully"}

    def update(self, name: str, location: Location):
        result = self.collection.update_one({"name": name}, {"$set": location.dict()})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Location not found")
        return {"message": f"Location '{name}' updated successfully"}

    def delete(self, name: str):
        result = self.collection.delete_one({"name": name})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Location not found")
        return {"message": f"Location '{name}' deleted successfully"}
