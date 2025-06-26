import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

interface Transaction {
  transactionType: "Debit" | "Credit";
  amount: number;
  transactionDate: string;
}

interface Props {
  transactions: Transaction[];
}

const screenWidth = Dimensions.get("window").width;

export default function TrendChart({ transactions }: Props) {
  // Filtrar transacciones tipo Debit y agrupar por fecha (formato YYYY-MM-DD)
  const debitTxs = transactions.filter((tx) => tx.transactionType === "Debit");
  const grouped: Record<string, number> = {};

  debitTxs.forEach((tx) => {
    const date = tx.transactionDate.slice(0, 10); // YYYY-MM-DD
    grouped[date] = (grouped[date] || 0) + tx.amount;
  });

  const labels = Object.keys(grouped);
  const data = Object.values(grouped);

  if (labels.length === 0) {
    return (
      <View className="mb-4 p-4 rounded-xl bg-white shadow-sm">
        <Text className="text-lg font-bold text-primary mb-2">Tendencia semanal</Text>
        <Text className="text-textSecondary">No hay datos válidos para mostrar.</Text>
      </View>
    );
  }

  return (
    <View className="mb-4 p-4 rounded-xl bg-white shadow-sm">
      <Text className="text-lg font-bold text-primary mb-2">Tendencia semanal</Text>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data,
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix=" S/"
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#007aff",
          },
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}
