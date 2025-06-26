import React from "react";
import { View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";

interface Category {
  categoryId: number;
  name: string;
  type: "Expense" | "Savings";
}

interface Transaction {
  transactionType: "Debit" | "Credit";
  amount: number;
  subcategoryId: number;
}

interface Props {
  transactions: Transaction[];
  categories: Category[];
}

export default function CategoryPerformance({ transactions, categories }: Props) {
  const subcategoryMap: Record<number, number> = {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
  };

  const debitTxs = transactions.filter((t) => t.transactionType === "Debit");

  const grouped = categories
    .map((cat) => {
      const total = debitTxs
        .filter((tx) => subcategoryMap[tx.subcategoryId] === cat.categoryId)
        .reduce((sum, tx) => sum + tx.amount, 0);
      return { name: cat.name, type: cat.type, total };
    })
    .filter((c) => c.total > 0);

  const maxValue = Math.max(...grouped.map((g) => g.total), 1); // evitar división por cero

  const getColor = (index: number) => {
    const colors = ["#FF6B6B", "#FFD93D", "#6BCB77"];
    return colors[index % colors.length];
  };

  return (
    <View className="bg-white rounded-2xl shadow-sm p-4 mb-6">
      <Text className="text-lg font-bold text-primary mb-4">
        Desempeño por categoría
      </Text>

      {grouped.length === 0 ? (
        <Text className="text-textSecondary">No hay datos suficientes.</Text>
      ) : (
        grouped.map((item, idx) => (
          <View key={idx} className="mb-5">
            <View className="flex-row justify-between mb-1 px-1">
              <Text className="text-textPrimary">{item.name}</Text>
              <Text className="text-textSecondary font-semibold">
                S/ {item.total.toFixed(2)}
              </Text>
            </View>
            <ProgressBar
              progress={item.total / maxValue}
              color={getColor(idx)}
              style={{ height: 10, borderRadius: 8 }}
            />
          </View>
        ))
      )}
    </View>
  );
}
