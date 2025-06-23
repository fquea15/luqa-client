import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MonthlySummaryProps {
  incomes: number;
  expenses: number;
  balance: number;
}

export default function MonthlySummary({ incomes, expenses, balance }: MonthlySummaryProps) {
  return (
    <View className="bg-white rounded-2xl p-6 shadow mb-6">
      <Text className="text-center text-lg font-semibold text-textPrimary-800 mb-4">
        Resumen del mes
      </Text>

      <View className="flex-row justify-between">
        <View className="items-center w-[30%]">
          <Ionicons name="arrow-up-circle" size={28} color="#4CAF50" />
          <Text className="text-sm text-textSecondary-500 mt-1">Ingresos</Text>
          <Text className="font-semibold text-success-600">S/ {incomes.toFixed(2)}</Text>
        </View>

        <View className="items-center w-[30%]">
          <Ionicons name="arrow-down-circle" size={28} color="#E53935" />
          <Text className="text-sm text-textSecondary-500 mt-1">Gastos</Text>
          <Text className="font-semibold text-danger-500">S/ {expenses.toFixed(2)}</Text>
        </View>

        <View className="items-center w-[30%]">
          <Ionicons name="wallet-outline" size={28} color="#00ACC1" />
          <Text className="text-sm text-textSecondary-500 mt-1">Saldo disponible</Text>
          <Text className="font-semibold text-secondary-600">S/ {balance.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}
