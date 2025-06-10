import { View, Text, TouchableOpacity } from "react-native";

export default function PointsCard() {
  return (
    <View className="bg-white rounded-3xl px-6 py-8 items-center justify-center shadow-md mb-12 w-full">
      <Text className="text-lg text-textSecondary-500 font-medium mb-2">🔥 9 cursos completados</Text>

      <Text className="text-5xl font-extrabold text-textPrimary-800 mb-6">25 puntos</Text>

      <TouchableOpacity className="bg-primary-700 px-8 py-4 rounded-full mb-4 w-full items-center">
        <Text className="text-white font-bold text-base">Continuar Aprendiendo</Text>
      </TouchableOpacity>

      <Text className="text-primary-700 text-base font-medium underline">Conocer más</Text>
    </View>
  );
}
