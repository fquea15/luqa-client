import { View, Text } from "react-native";

export default function DistributionBox() {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-textPrimary-800 mb-3">Distribución 50/30/20</Text>
      <View className="flex-row justify-between">
        <View className="bg-warning-100 w-[30%] p-3 rounded-xl items-center shadow-sm">
          <Text className="font-bold text-warning-800 text-xl">50%</Text>
          <Text className="text-center text-sm text-textPrimary-700">Necesidades{"\n"}S/625.00</Text>
        </View>
        <View className="bg-secondary-100 w-[30%] p-3 rounded-xl items-center shadow-sm">
          <Text className="font-bold text-secondary-700 text-xl">30%</Text>
          <Text className="text-center text-sm text-textPrimary-700">Gustos{"\n"}S/350.00</Text>
        </View>
        <View className="bg-success-100 w-[30%] p-3 rounded-xl items-center shadow-sm">
          <Text className="font-bold text-success-700 text-xl">20%</Text>
          <Text className="text-center text-sm text-textPrimary-700">Ahorros{"\n"}S/150.00</Text>
        </View>
      </View>
    </View>
  );
}
