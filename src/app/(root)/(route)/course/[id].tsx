import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

const CourseScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex h-screen w-screen items-center justify-center bg-blue-950">
      <Text className="text-gray-100">Lista de lecciones de curso con id: {id}</Text>
      <Link href={{ pathname: "/(root)/(route)/lesson/[id]", params: { id: "video1" } }}>
        <Text>Ir a ver el video</Text>
      </Link>
    </View>
  );
};

export default CourseScreen;
