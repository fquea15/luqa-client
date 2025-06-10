import { View, Text } from "react-native";

export default function ProgressBar() {
  return (
    <View className="mb-6">
      <Text className="text-base font-medium text-textPrimary-800 mb-2">Tu progreso:</Text>
      <Text className="text-sm text-textSecondary-500 mb-2">Has gastado el 75% de tu presupuesto</Text>

      <View className="h-4 w-full bg-background-300 rounded-full overflow-hidden mb-1">
        <View className="bg-warning-500 h-full w-[75%] rounded-full" />
      </View>

      <Text className="text-sm text-textSecondary-500">S/ 1500 de S/ 2000 presupuestado</Text>
    </View>
  );
}
