// src/components/budget/SubcategoryItem.tsx

import React from "react";
import { View, Text } from "react-native";

interface Props {
  name: string;
  amount: number;
  spent: number;
}

export default function SubcategoryItem({ name, amount, spent }: Props) {
  const remaining = amount - spent;
  const percentage = Math.min(100, (spent / amount) * 100);

  return (
    <View className="mb-2">
      <View className="flex-row justify-between">
        <Text className="text-base font-medium text-textPrimary">{name}</Text>
        <Text className="text-base font-semibold text-textPrimary">
          S/. {spent.toFixed(2)} de S/. {amount.toFixed(2)}
        </Text>
      </View>

      <View className="h-2 bg-gray-200 rounded-full mt-1 mb-1 overflow-hidden">
        <View
          className="h-full bg-primary rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>

      <Text className="text-sm text-success">
        {percentage.toFixed(1)}% utilizado – S/. {remaining.toFixed(2)} restante
      </Text>
    </View>
  );
}
