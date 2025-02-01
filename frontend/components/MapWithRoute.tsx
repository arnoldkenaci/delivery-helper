import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

interface RoutePoint {
  latitude: number;
  longitude: number;
}

const MapWithRoute: React.FC<Props> = ({ route }) => {
  const { groupId } = route.params;
  const [routeData, setRouteData] = useState<RoutePoint[] | null>(null);

  useEffect(() => {
    fetchRoute();
  }, []);

  const fetchRoute = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/groups/${groupId}/route`);
      setRouteData(response.data.route);
    } catch (error) {
      console.error('Failed to fetch route', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!routeData ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: routeData[0].latitude,
            longitude: routeData[0].longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Polyline
            coordinates={routeData.map((point) => ({ latitude: point.latitude, longitude: point.longitude }))}
            strokeWidth={4}
            strokeColor="blue"
          />
          {routeData.map((point, index) => (
            <Marker key={index} coordinate={{ latitude: point.latitude, longitude: point.longitude }} title={`Point ${index + 1}`} />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default MapWithRoute;
