import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryPerformance() {
  return (
    <View className="mb-6">
      <Text className="text-base font-medium text-textPrimary-800 mb-3">Desempeño presupuestal</Text>

      <View className="flex-row justify-between mb-2">
        <View>
          <Text className="text-textPrimary-800">Alimentos</Text>
          <Text className="text-sm text-success-700">🟢 Dentro del presupuesto</Text>
        </View>
        <Text className="text-textPrimary-800">S/ 400.00</Text>
      </View>

      <View className="flex-row justify-between">
        <View>
          <Text className="text-textPrimary-800">Transporte</Text>
          <Text className="text-sm text-danger-500">🔴 Excedido</Text>
        </View>
        <Text className="text-textPrimary-800">S/ 250.00</Text>
      </View>
    </View>
  );
}
