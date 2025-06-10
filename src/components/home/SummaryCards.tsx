import { View, Text } from "react-native";

export default function SummaryCards() {
  return (
    <View className="flex-row justify-between mb-4">
      <View className="bg-primary-700 w-[48%] rounded-2xl p-4">
        <Text className="text-white text-sm">Monto de Dinero</Text>
        <Text className="text-white text-2xl font-bold">1000 soles</Text>
      </View>
      <View className="bg-secondary-500 w-[48%] rounded-2xl p-4">
        <Text className="text-white text-sm">Egreso Semanal</Text>
        <Text className="text-white text-2xl font-bold">– 400 soles</Text>
      </View>
    </View>
  );
}
