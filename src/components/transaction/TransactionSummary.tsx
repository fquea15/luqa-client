import { View, Text } from "react-native";

export default function TransactionSummary() {
  return (
    <View className="bg-white shadow-sm rounded-xl p-4 mb-6">
      <Text className="text-sm text-textSecondary-500">TOTAL DE GASTOS:</Text>
      <Text className="text-xl font-bold text-primary-700">S/. 392.00</Text>
      <Text className="text-sm text-textSecondary-500 mt-1">Restante S/ 357.80 de S/ 750.00</Text>
    </View>
  );
}
