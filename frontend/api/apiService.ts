export interface Location {
  id?: string; // Optional for new locations
  lat: number;
  lon: number;
}

const BASE_URL = "http://192.168.18.67:8000";

export const fetchLocations = async (): Promise<Location[]> => {
  const response = await fetch(`${BASE_URL}/locations`);
  if (!response.ok) throw new Error("Failed to fetch locations");
  return response.json();
};

export const postLocation = async (location: Location): Promise<Location> => {
  const response = await fetch(`${BASE_URL}/locations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(location),
  });

  if (!response.ok) throw new Error("Failed to post location");
  return response.json();
};

export const updateLocation = async (location: Location): Promise<Location> => {
  if (!location.id) throw new Error("Location ID is required for updates");

  const response = await fetch(`${BASE_URL}/locations/${location.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(location),
  });

  if (!response.ok) throw new Error("Failed to update location");
  return response.json();
};
