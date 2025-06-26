import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import { getUserTransactions } from "@/shared/services/transactionService";
import { getUserSubcategories } from "@/shared/services/subcategoryService";

export default function ExpenseChart() {
  const [barData, setBarData] = useState<{ label: string; value: number; frontColor: string }[]>([]);

  const COLORS = ["#004E64", "#00A6A6", "#F9A825", "#E53935", "#4CAF50"];

  useEffect(() => {
    const fetchData = async () => {
      const [transactions, subcategories] = await Promise.all([
        getUserTransactions(),
        getUserSubcategories(),
      ]);

      const subMap: Record<number, string> = {};
      for (const sub of subcategories) {
        subMap[sub.subcategoryId] = sub.name;
      }

      const totals: Record<string, number> = {};
      for (const tx of transactions) {
        if (tx.transactionType === "Debit") {
          const name = subMap[tx.subcategoryId] ?? "Otro";
          totals[name] = (totals[name] || 0) + tx.amount;
        }
      }

      const sorted = Object.entries(totals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([label, value], i) => ({
          label,
          value,
          frontColor: COLORS[i % COLORS.length],
        }));

      setBarData(sorted);
    };

    fetchData();
  }, []);

  if (!barData.length) {
    return (
      <View className="bg-white rounded-2xl p-4 shadow-sm mt-4">
        <Text className="text-lg font-bold text-textPrimary-800 mb-2">
          Top subcategorías de gasto
        </Text>
        <Text className="text-sm text-textSecondary-500 text-center">
          No hay transacciones registradas aún.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mt-4">
      
      <BarChart
        data={barData}
        barWidth={22}
        barBorderRadius={6}
        yAxisThickness={0}
        xAxisThickness={0}
        hideRules
        isAnimated
        noOfSections={3}
        labelWidth={20}
        spacing={30}
        maxValue={Math.max(...barData.map((d) => d.value)) * 1.2}
        renderTooltip={(item: { value: number }) => (
          <View className="px-2 py-1 rounded bg-primary-800">
            <Text className="text-white text-xs">S/ {item.value.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}
