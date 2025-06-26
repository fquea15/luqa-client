import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getRecommendation } from "@/shared/services/homeService";

export default function RecommendationBox() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const data = await getRecommendation(2);
        if (data?.message) {
          setMessage(data.message);
        }
      } catch (error) {
        console.error("Error al obtener recomendación:", error);
      }
    };

    fetchRecommendation();
  }, []);

  if (!message) return null;

  return (
    <View className="bg-yellow-100 rounded-xl p-4 mt-6 flex-row items-start">
      <Ionicons name="warning-outline" size={20} color="#BF360C" className="mr-2 mt-1" />
      <View className="flex-1">
        <Text className="font-semibold text-warning-900 mb-1">Recomendación personalizada</Text>
        <Text className="text-sm text-warning-900">{message}</Text>
      </View>
    </View>
  );
}
