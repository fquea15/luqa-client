import React from "react";
import { View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";

interface Props {
  subcategory: {
    name: string;
    budgetAllocation: {
      assignedAmount: number;
      spentAmount: number;
    };
  };
}

export default function SubcategoryItem({ subcategory }: Props) {
  const assigned = subcategory.budgetAllocation?.assignedAmount ?? 0;
  const spent = subcategory.budgetAllocation?.spentAmount ?? 0;
  const percent = assigned > 0 ? (spent / assigned) * 100 : 0;

  return (
    <View className="mb-4 p-4 bg-white rounded-xl shadow-sm">
      <View className="flex-row justify-between mb-1">
        <Text className="font-semibold text-textPrimary">{subcategory.name}</Text>
        <Text className="font-semibold text-primary">
          S/ {spent.toFixed(2)} de S/ {assigned.toFixed(2)}
        </Text>
      </View>
      <ProgressBar
        progress={percent / 100}
        color={percent < 100 ? "#2563EB" : "#DC2626"}
        style={{ height: 8, borderRadius: 10 }}
      />
      <Text className={`text-xs mt-1 ${percent < 100 ? "text-success" : "text-danger"}`}>
        {percent.toFixed(1)}% utilizado —{" "}
        {percent < 100
          ? `S/ ${(assigned - spent).toFixed(2)} restante`
          : `Has excedido el presupuesto`}
      </Text>
    </View>
  );
}
