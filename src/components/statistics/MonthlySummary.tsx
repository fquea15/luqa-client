// src/components/statistics/MonthlySummary.tsx
import React from "react";
import { View, Text } from "react-native";

interface Props {
  balance: {
    totalIncome: number;
    totalExpenses: number;
    totalSavings: number;
    balance: number;
  };
}

export default function MonthlySummary({ balance }: Props) {
  if (!balance) return null;

  return (
    <View className="mb-4 p-4 rounded-xl bg-white shadow-md space-y-3">
      <Text className="text-lg font-bold text-primary">Resumen del mes</Text>

      <View className="flex-row justify-between">
        <Text className="text-textSecondary">Ingresos:</Text>
        <Text className="text-success font-semibold">+S/ {(balance.totalIncome ?? 0).toFixed(2)}</Text>
      </View>

      <View className="flex-row justify-between">
        <Text className="text-textSecondary">Egresos:</Text>
        <Text className="text-danger font-semibold">–S/ {(balance.totalExpenses ?? 0).toFixed(2)}</Text>
      </View>

      <View className="flex-row justify-between">
        <Text className="text-textSecondary">Ahorros:</Text>
        <Text className="text-warning font-semibold">S/ {(balance.totalSavings ?? 0).toFixed(2)}</Text>
      </View>

      <View className="flex-row justify-between border-t border-gray-200 pt-2 mt-2">
        <Text className="text-textPrimary font-medium">Balance:</Text>
        <Text className="text-primary font-bold text-lg">S/ {(balance.balance ?? 0).toFixed(2)}</Text>
      </View>
    </View>
  );
}
