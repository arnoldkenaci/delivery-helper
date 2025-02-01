import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GroupDashboard from './components/GroupDashboard';
import MapWithRoute from './components/MapWithRoute';

export type RootStackParamList = {
  Dashboard: undefined;
  Map: { groupId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={GroupDashboard} />
        <Stack.Screen name="Map" component={MapWithRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
