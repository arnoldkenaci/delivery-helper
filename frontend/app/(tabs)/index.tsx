import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useFetchLocations } from "@/hooks/useLocations";

const LocationScreen: React.FC = () => {
  // Using React Query hook
  const { data: locations, isLoading, isError } = useFetchLocations();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error fetching locations.</Text>;
  }

  return (
    <View>
      <FlatList
        data={locations}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default LocationScreen;
