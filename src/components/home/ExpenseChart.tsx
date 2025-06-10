import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function ExpenseChart() {
  const chartData = [
    { name: "Facturas", amount: 1500, color: "#E53935" },
    { name: "Compras", amount: 850, color: "#00A6A6" },
    { name: "Personales", amount: 450, color: "#4CAF50" },
    { name: "Entretenimiento", amount: 250.5, color: "#F9A825" },
  ];

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-textPrimary-800 mb-3">Distribución de Gastos</Text>
      <PieChart
        data={chartData.map((item) => ({
          name: item.name,
          population: item.amount,
          color: item.color,
          legendFontColor: "#1A1A1A",
          legendFontSize: 13,
        }))}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: () => "#000",
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="16"
        absolute
      />
    </View>
  );
}
