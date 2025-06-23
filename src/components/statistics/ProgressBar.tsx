import React from "react";
import { View, Text } from "react-native";

interface Props {
  progressPercentage: number;
  spent: number;
  total: number;
}

export default function ProgressBar({ progressPercentage, spent, total }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1 font-medium">Tu progreso:</Text>
      <Text className="text-sm text-gray-600 mb-2">
        Has gastado el {progressPercentage}% de tu presupuesto
      </Text>
      <View className="h-3 bg-gray-200 rounded-full overflow-hidden mb-1">
        <View
          className="h-full bg-yellow-400"
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        />
      </View>
      <Text className="text-sm text-gray-600">
        S/ {spent.toFixed(2)} de S/ {total.toFixed(2)} presupuestado
      </Text>
    </View>
  );
}
