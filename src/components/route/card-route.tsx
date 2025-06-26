// components/route/card-route.tsx
import { Route } from "@/shared/services/routeService";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  ruta: Route;
};

export default function CardRoute({ ruta }: Props) {
  return (
    <View className="mb-6 bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex-row items-center">
      {/* Imagen del icono sin fondo */}
      <View className="w-24 h-24 mr-5 justify-center items-center">
        <Image
          source={{ uri: ruta.imageUrl }}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>

      {/* Contenido: título, descripción y botón */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-primary-800 mb-1">
          {ruta.title}
        </Text>
        <Text className="text-base text-textSecondary-500 leading-snug mb-2">
          {ruta.description}
        </Text>

        <View className="flex-row justify-end">
          <Link
            href={{
              pathname: "/(root)/(route)/[id]",
              params: { id: ruta.routeId.toString() },
            }}
            asChild
          >
            <TouchableOpacity className="bg-secondary-500 px-4 py-2 rounded-xl shadow-sm">
              <Text className="text-base text-white font-medium">Ver cursos</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}
