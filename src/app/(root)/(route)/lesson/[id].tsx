import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const LessonScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex h-screen w-screen items-center justify-center bg-blue-950">
      <Text className="text-gray-100">Viendo el video de la leccion con id {id}</Text>
    </View>
  );
};

export default LessonScreen;
