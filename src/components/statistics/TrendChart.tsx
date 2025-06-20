import { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getTransactions } from "@/shared/services/statisticsService";

const screenWidth = Dimensions.get("window").width;

export default function TrendChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [incomeData, setIncomeData] = useState<number[]>([]);
  const [expenseData, setExpenseData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const txs = await getTransactions();

        const grouped: Record<string, { income: number; expense: number }> = {};

        txs.forEach((t: any) => {
          const date = new Date(t.transactionDate).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "short",
          });

          if (!grouped[date]) grouped[date] = { income: 0, expense: 0 };

          if (t.transactionType === "Credit") grouped[date].income += t.amount;
          if (t.transactionType === "Debit") grouped[date].expense += t.amount;
        });

        const sortedDates = Object.keys(grouped).sort((a, b) =>
          new Date(a).getTime() - new Date(b).getTime()
        );

        const incomes = sortedDates.map((d) => grouped[d].income);
        const expenses = sortedDates.map((d) => grouped[d].expense);

        setLabels(sortedDates);
        setIncomeData(incomes);
        setExpenseData(expenses);
      } catch (error) {
        console.error("❌ Error al obtener datos de tendencia:", error);
      }
    };

    fetchData();
  }, []);

  if (!labels.length || !incomeData.length || !expenseData.length) {
    return (
      <View className="mb-6">
        <Text className="text-sm text-textSecondary-500">No hay datos suficientes para mostrar el gráfico.</Text>
      </View>
    );
  }

  return (
    <View className="mb-10">
      <Text className="text-lg font-bold text-textPrimary-800 mb-4">Tendencia del Mes</Text>

      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: incomeData,
              color: () => "#4DB0C2", 
              strokeWidth: 2,
            },
            {
              data: expenseData,
              color: () => "#E53935", 
              strokeWidth: 2,
            },
          ],
          legend: ["Ingresos", "Gastos"],
        }}
        width={screenWidth - 24}
        height={250}
        withShadow={true}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        bezier
        chartConfig={{
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          decimalPlaces: 0,
          color: () => "#1A1A1A",
          labelColor: () => "#5F6C7B",
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ffffff",
          },
          propsForLabels: {
            fontWeight: "600",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 20,
        }}
      />
    </View>
  );
}
