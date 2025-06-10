// components/route/card-route.tsx
import { Route } from "@/shared/services/routeService";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  ruta: Route;
};

export default function CardRoute({ ruta }: Props) {
  return (
    <View className="mb-5 bg-white rounded-3xl p-5 shadow-md flex-row items-center">
      {/* Ícono al lado izquierdo */}
      <View className="w-16 h-16 mr-4 justify-center items-center">
        <Image
          source={require("@/assets/icons/coin.png")}
          className="w-20 h-12"
          resizeMode="contain"
        />
      </View>

      {/* Título y descripción */}
      <View className="flex-1">
        <Text className="text-lg font-bold text-textPrimary-800 mb-1">
          {ruta.title}
        </Text>
        <Text className="text-base text-textSecondary-500 leading-relaxed">
          {ruta.description}
        </Text>

        {/* Botón */}
        <View className="flex-row justify-end mt-4">
          <Link
            href={{
              pathname: "/(root)/(route)/[id]",
              params: { id: ruta.routeId.toString() },
            }}
            asChild
          >
            <TouchableOpacity className="bg-secondary-500 px-4 py-2 rounded-full">
              <Text className="text-white text-sm font-semibold">Ver cursos</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}
