import React from "react";
import { View, Text } from "react-native";

interface Props {
  budget: any;
  transactions: any[];
}

export default function SummaryCards({ budget, transactions }: Props) {
  if (!budget) {
    return (
      <View className="p-4 bg-warning-100 rounded-xl mt-2">
        <Text className="text-warning-800 font-semibold">
          ⚠️ No se encontró presupuesto activo.
        </Text>
      </View>
    );
  }

  const now = new Date();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(now.getDate() - 7);

const weeklyDebits = transactions
  .filter((t) => {
    const txDate = new Date(t.transaction_date);
    return (
      t.transaction_type === "Debit" &&
      txDate >= sevenDaysAgo &&
      txDate <= now
    );
  })
  .reduce((sum, t) => sum + t.amount, 0);

  const available = budget.budgetLimit - weeklyDebits;

  return (
    <View className="mb-4 space-y-4">
      <View className="flex-row justify-between">
        <View className="bg-primary-800 rounded-2xl p-4 w-[48%] shadow-lg">
          <Text className="text-white text-sm">Monto de Dinero</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            S/ {available.toFixed(2)}
          </Text>
        </View>

        <View className="bg-teal-500 rounded-2xl p-4 w-[48%] shadow-lg">
          <Text className="text-white text-sm">Egreso Semanal</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            - S/ {weeklyDebits.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
