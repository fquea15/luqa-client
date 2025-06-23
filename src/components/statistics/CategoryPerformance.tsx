import React from "react";
import { View, Text } from "react-native";

interface Props {
  allocations: any[];
  transactions: any[];
}

export default function CategoryPerformance({ allocations, transactions }: Props) {
  const categories = ["Saving", "Needs"];

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-2">Desempeño presupuestal</Text>
      {categories.map((type) => {
        const relevantAlloc = allocations.filter((a) => a.subcategory?.type === type);
        const relevantTx = transactions.filter((t) => {
          const sub = allocations.find((a) => a.subcategoryId === t.subcategoryId);
          return sub?.subcategory?.type === type && t.transactionType === "Debit";
        });

        const assigned = relevantAlloc.reduce((sum, a) => sum + a.assignedAmount, 0);
        const spent = relevantTx.reduce((sum, t) => sum + t.amount, 0);

        return (
          <View key={type} className="mb-2">
            <Text className="text-sm font-semibold mb-1">
              {type === "Saving" ? "Ahorros" : "Necesidades"}
            </Text>
            <View className="bg-gray-100 p-2 rounded-xl">
              <Text className="text-sm text-gray-700">
                Asignado: S/ {assigned.toFixed(2)} | Gastado: S/ {spent.toFixed(2)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
