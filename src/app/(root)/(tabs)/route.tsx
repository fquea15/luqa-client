import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const RouteScreen = () => {
  return (
    <SafeAreaView>
      <View className="flex h-screen w-screen items-center justify-center bg-blue-950">
        <Text className="text-gray-100">Lista de Rutas</Text>
        <Link href={{ pathname: "/(root)/(route)/[id]", params: { id: "123" } }}>
          <Text>Ir a Lista Cursos</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default RouteScreen;
