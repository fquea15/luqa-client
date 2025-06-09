import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const ProfileScreen = () => {
  return (
    <View className="flex h-screen w-screen items-center justify-center bg-blue-950">
      <Text className="text-gray-500">Welcome to the Home Screen!</Text>
    </View>
  );
};

export default ProfileScreen;
