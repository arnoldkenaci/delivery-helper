import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

const API_BASE_URL = "http://192.168.0.164:8000"; // Replace with your actual backend URL

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [route, setRoute] = useState([]);

  // Fetch mock locations from backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/locations`)
      .then((response) => {
        const locArray = Object.keys(response.data).map((name) => ({
          name,
          latitude: response.data[name].latitude,
          longitude: response.data[name].longitude,
        }));
        setLocations(locArray);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  // Get user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userLoc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(userLoc);

      if (location) {
        getOptimizedRoute(userLoc);
      }
    })();
  }, []);

  // Fetch shortest route from backend
  const getOptimizedRoute = async (userCoords) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/shortest-route`, {
        start_location: {
          latitude: userCoords.latitude,
          longitude: userCoords.longitude,
        },
      });

      if (response.data.paths && response.data.paths.length > 0) {
        const points = response.data.paths[0].points.coordinates.map(
          (coord) => ({
            latitude: coord[1], // Latitude is the second value
            longitude: coord[0], // Longitude is the first value
          })
        );

        setRoute(points);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch optimized route.");
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation?.latitude || 39.875,
          longitude: userLocation?.longitude || 20.005,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* User's Location Marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You are here"
            pinColor="blue"
          />
        )}

        {/* Mock Locations as Markers */}
        {locations.map((loc, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={loc.name}
          />
        ))}

        {/* Polyline for the optimized route */}
        {route.length > 0 && (
          <Polyline
            key={route.length} // Forces re-render
            coordinates={route}
            strokeWidth={3}
            strokeColor="blue"
            fillColor="rgba(255,0,0,0.5)"
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
