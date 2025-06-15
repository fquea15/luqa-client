import { View, Text } from "react-native";

type Props = {
  title: string;
  date: string;
  amount: number;
  type: "Necesidad" | "Gustos" | "Ahorro";
  transactionType: "Debit" | "Credit";
};

export default function TransactionItem({ title, date, amount, type, transactionType }: Props) {
  const isPositive = transactionType === "Credit";

  const typeColorMap: Record<string, string> = {
    Necesidad: "text-red-500",
    Gustos: "text-yellow-600",
    Ahorro: "text-green-600",
  };

  return (
    <View className="bg-white rounded-lg p-3 mb-2 shadow-sm">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-base text-textPrimary-800 font-medium">{title}</Text>
          <Text className="text-xs text-textSecondary-500">{date}</Text>
        </View>

        <View className="items-end">
          <Text className={`text-base font-semibold ${isPositive ? "text-green-600" : "text-red-500"}`}>
            {isPositive ? "+ " : "- "}S/ {Math.abs(amount).toFixed(2)}
          </Text>
          <Text className={`text-xs ${typeColorMap[type]}`}>{type}</Text>
        </View>
      </View>
    </View>
  );
}
