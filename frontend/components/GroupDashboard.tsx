import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

interface Group {
  id: string;
  name: string;
}

const GroupDashboard: React.FC<Props> = ({ navigation }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:8000/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Failed to fetch groups', error);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Delivery Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, marginBottom: 5, borderWidth: 1 }}>
            <Text>Group: {item.name}</Text>
            <Button title="View Route" onPress={() => navigation.navigate('Map', { groupId: item.id })} />
          </View>
        )}
      />
    </View>
  );
};

export default GroupDashboard;
