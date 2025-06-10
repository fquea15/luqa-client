import { View, Text } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function MonthlySummary() {
  return (
    <View className="bg-white rounded-2xl p-6 shadow mb-6">
      <Text className="text-center text-lg font-semibold text-primary-700 mb-4">Resumen del mes</Text>

      <View className="flex-row justify-between mb-4">
        <View className="items-center w-[24%]">
          <Ionicons name="arrow-up-circle-outline" size={28} color="#4CAF50" />
          <Text className="text-sm text-textSecondary-500 mt-1">Ingresos</Text>
          <Text className="font-semibold text-success-600">S/ 600.00</Text>
        </View>

        <View className="items-center w-[24%]">
          <Ionicons name="arrow-down-circle-outline" size={28} color="#E53935" />
          <Text className="text-sm text-textSecondary-500 mt-1">Gastos</Text>
          <Text className="font-semibold text-danger-500">- S/ 3000.00</Text>
        </View>

        <View className="items-center w-[24%]">
          <FontAwesome5 name="piggy-bank" size={24} color="#FF9800" />
          <Text className="text-sm text-textSecondary-500 mt-1">Ahorros</Text>
          <Text className="font-semibold text-warning-600">S/ 1500.00</Text>
        </View>

        <View className="items-center w-[24%]">
          <MaterialCommunityIcons name="wallet-outline" size={28} color="#00A6A6" />
          <Text className="text-sm text-textSecondary-500 mt-1">Balance</Text>
          <Text className="font-semibold text-secondary-600">S/ 2500.00</Text>
        </View>
      </View>
    </View>
  );
}
