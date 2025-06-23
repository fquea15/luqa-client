
import { View, Text } from "react-native";

interface Props {
  needs: number;
  wants: number;
  savings: number;
}

export default function DistributionBox({ needs, wants, savings }: Props) {
  return (
    <View className="mt-6">
      <Text className="font-bold text-xl text-textPrimary-800 mb-4">
        Distribución 50 / 30 / 20
      </Text>
      <View className="flex-row justify-between gap-3">
        {/* NECESIDADES */}
        <View className="bg-warning-100 p-4 rounded-2xl w-[30%] shadow-md">
          <View className="gap-y-2">
            <Text className="text-warning-500 text-xl font-bold text-center">50%</Text>
            <Text className="text-textPrimary-700 text-center font-semibold">Necesidades</Text>
            <Text className="text-textPrimary-900 text-center text-base">S/ {needs.toFixed(2)}</Text>
          </View>
        </View>

        {/* GUSTOS */}
        <View className="bg-secondary-100 p-4 rounded-2xl w-[30%] shadow-md">
          <View className="gap-y-2">
            <Text className="text-secondary-500 text-xl font-bold text-center">30%</Text>
            <Text className="text-textPrimary-700 text-center font-semibold">Gustos</Text>
            <Text className="text-textPrimary-900 text-center text-base">S/ {wants.toFixed(2)}</Text>
          </View>
        </View>

        {/* AHORROS */}
        <View className="bg-success-100 p-4 rounded-2xl w-[30%] shadow-md">
          <View className="gap-y-2">
            <Text className="text-success-500 text-xl font-bold text-center">20%</Text>
            <Text className="text-textPrimary-700 text-center font-semibold">Ahorros</Text>
            <Text className="text-textPrimary-900 text-center text-base">S/ {savings.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}