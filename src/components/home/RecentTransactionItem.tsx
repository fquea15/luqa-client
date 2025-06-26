import { View, Text } from "react-native";

type Props = {
  description: string;
  amount: number;
  type: "Debit" | "Credit";
  date: string;
};

export default function RecentTransactionItem({
  description,
  amount,
  type,
  date,
}: Props) {
  const isDebit = type === "Debit";
  const icon = isDebit ? "↗" : "↘";
  const color = isDebit ? "text-danger-600" : "text-success-600";

  const formattedDate = new Date(date).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = new Date(date).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <View className="flex-row justify-between items-center py-3 border-b border-background-200 mb-3">
      <View className="flex-1 pr-2">
        <Text className="text-textPrimary-800 font-medium mb-0.5">
          {description}
        </Text>
        <Text className="text-xs text-textSecondary-500">
          {formattedDate} - {formattedTime}
        </Text>
      </View>

      <View className="flex-row items-center space-x-1">
        <Text className={`text-xs ${color} opacity-60`}>{icon}</Text>
        <Text className={`text-sm font-semibold ${color}`}>
          S/ {amount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
