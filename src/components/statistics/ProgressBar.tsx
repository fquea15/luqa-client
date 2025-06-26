// src/components/statistics/ProgressBar.tsx
import React from "react";
import { View, Text } from "react-native";

interface Props {
  allocations: {
    subcategory: { subcategoryName: string };
    assignedAmount: number;
    spentAmount: number;
  }[];
}

export default function ProgressBar({ allocations }: Props) {
  const totalAssigned = allocations.reduce((sum, a) => sum + a.assignedAmount, 0);
  const totalSpent = allocations.reduce((sum, a) => sum + a.spentAmount, 0);
  const percentage = totalAssigned > 0 ? totalSpent / totalAssigned : 0;

  return (
    <View className="mb-4 p-4 rounded-xl bg-white shadow-sm space-y-2">
      <Text className="text-lg font-bold text-primary">Progreso Presupuestal</Text>
      <View className="flex-row justify-between">
        <Text className="text-textSecondary">Gastado:</Text>
        <Text className="text-danger font-semibold">
          S/ {totalSpent.toFixed(2)}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-textSecondary">Asignado:</Text>
        <Text className="text-primary font-semibold">
          S/ {totalAssigned.toFixed(2)}
        </Text>
      </View>
      <View className="mt-2 w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-4 bg-primary rounded-full"
          style={{ width: `${Math.min(percentage * 100, 100)}%` }}
        />
      </View>
      <Text className="text-right mt-1 text-sm text-textSecondary">
        {Math.round(percentage * 100)}%
      </Text>
    </View>
  );
}
