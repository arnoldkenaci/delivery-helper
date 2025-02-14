import React, { useState } from "react";
import { View, Button, Text, TextInput, FlatList } from "react-native";
import {
  useFetchLocations,
  usePostLocation,
  useUpdateLocation,
} from "../hooks/useLocations";
import { Location } from "../api/apiService";

const LocationScreen: React.FC = () => {
  const { data: locations, error, isLoading } = useFetchLocations();
  const { mutate: addLocation } = usePostLocation();
  const { mutate: modifyLocation } = useUpdateLocation();

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [updateId, setUpdateId] = useState("");

  // ✅ Handle adding a new location
  const handleAddLocation = () => {
    if (!lat || !lon) return;
    addLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
    setLat("");
    setLon("");
  };

  // ✅ Handle updating an existing location
  const handleUpdateLocation = () => {
    if (!updateId || !lat || !lon) return;
    modifyLocation({
      id: updateId,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
    setUpdateId("");
    setLat("");
    setLon("");
  };

  return (
    <View>
      <Text>Locations:</Text>

      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <Text>{`ID: ${item.id} | Lat: ${item.lat}, Lon: ${item.lon}`}</Text>
        )}
      />

      <TextInput
        placeholder="Latitude"
        value={lat}
        onChangeText={setLat}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Longitude"
        value={lon}
        onChangeText={setLon}
        keyboardType="numeric"
      />

      <Button title="Add Location" onPress={handleAddLocation} />

      <TextInput
        placeholder="Update ID"
        value={updateId}
        onChangeText={setUpdateId}
      />
      <Button title="Update Location" onPress={handleUpdateLocation} />
    </View>
  );
};

export default LocationScreen;
