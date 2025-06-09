import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex h-screen w-screen items-center justify-center bg-blue-950">
      <Text className="text-gray-100">Lista de cursos de la ruta id: {id}</Text>
      <Link href={{ pathname: "/(root)/(route)/course/[id]", params: { id: "345" } }}>
        <Text>Ir a Ver lecciones</Text>
      </Link>
    </View>
  );
}
