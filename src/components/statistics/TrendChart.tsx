import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface Transaction {
  transactionDate: string;
  amount: number;
  transactionType: string; // "Income" o "Debit"
}

interface TrendChartProps {
  transactions: Transaction[];
}

export default function TrendChart({ transactions }: TrendChartProps) {
  // Agrupa datos por fecha
  const datesMap: Record<string, { ingresos: number; gastos: number }> = {};

  transactions.forEach((t) => {
    const date = t.transactionDate.split("T")[0];
    if (!datesMap[date]) {
      datesMap[date] = { ingresos: 0, gastos: 0 };
    }

    if (t.transactionType === "Income") {
      datesMap[date].ingresos += t.amount;
    } else {
      datesMap[date].gastos += t.amount;
    }
  });

  const labels = Object.keys(datesMap);
  const ingresos = labels.map((d) => datesMap[d].ingresos);
  const gastos = labels.map((d) => datesMap[d].gastos);

  return (
    <View className="bg-white rounded-2xl p-4 shadow">
      <Text className="text-base font-semibold text-textPrimary-800 mb-2">
        Tendencia del Mes
      </Text>
      <LineChart
        data={{
          labels,
          datasets: [
            { data: ingresos, color: () => "#26C6DA", strokeWidth: 2 },
            { data: gastos, color: () => "#EF5350", strokeWidth: 2 },
          ],
          legend: ["Ingresos", "Gastos"],
        }}
        width={320}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => "#999",
        }}
        bezier
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}
