import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecommendationBox() {
  return (
    <View className="bg-yellow-100 rounded-xl p-4 mt-6 flex-row items-start">
      <Ionicons name="warning-outline" size={20} color="#BF360C" className="mr-2 mt-1" />
      <View className="flex-1">
        <Text className="font-semibold text-warning-900 mb-1"> Recomendación personalizada</Text>
        <Text className="text-sm text-warning-900">
          Evita gastar más en transporte esta semana. Ya has usado el 95% de tu presupuesto en esta categoría.
        </Text>
      </View>
    </View>
  );
}
