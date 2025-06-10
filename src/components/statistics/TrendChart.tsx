import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function TrendChart() {
  return (
    <View className="mb-10">
      <Text className="text-lg font-bold text-textPrimary-800 mb-4"> Tendencia del Mes</Text>

      <LineChart
        data={{
          labels: ["1", "5", "10", "15", "20", "25", "30"],
          datasets: [
            {
              data: [600, 750, 1200, 1350, 1600, 1800, 2000],
              color: () => "#4DB0C2", // Ingresos (azul LUQA)
              strokeWidth: 2,
            },
            {
              data: [400, 500, 700, 850, 900, 950, 1000],
              color: () => "#E53935", // Gastos (rojo)
              strokeWidth: 2,
            },
          ],
          legend: ["Ingresos", "Gastos"],
        }}
        width={screenWidth - -20} // más ancho
        height={250} // más alto
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
            r: "5",
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
          paddingRight: 24,
          paddingLeft: 8,
        }}
      />
    </View>
  );
}
