import { View, Text } from "react-native";

type Props = {
  name: string;
  spent: number;
  total: number;
};

export default function BudgetSubcategory({ name, spent, total }: Props) {
  const percentage = (spent / total) * 100;

  return (
    <View className="mt-4">
      <View className="flex-row justify-between">
        <Text className="text-sm font-medium text-textPrimary-800">{name}</Text>
        <Text className="text-sm text-textPrimary-800">
          S/. {spent.toFixed(2)} de S/. {total.toFixed(2)}
        </Text>
      </View>
      <View className="h-2 mt-1 bg-background-300 rounded-full overflow-hidden">
        <View className="bg-primary-500 h-full" style={{ width: `${percentage}%` }} />
      </View>
      <Text className="text-xs text-success-600 mt-1">
        {percentage.toFixed(1)}% utilizado – S/. {(total - spent).toFixed(2)} restante
      </Text>
    </View>
  );
}
