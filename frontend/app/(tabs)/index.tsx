import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Welcome to the App</Text>
      <Button title="Open Map" onPress={() => router.push("/map")} />
    </View>
  );
}
