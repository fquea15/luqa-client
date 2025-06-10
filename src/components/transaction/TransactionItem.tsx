import { View, Text } from "react-native";

type Props = {
  title: string;
  date: string;
  amount: number;
  type: "Necesidad" | "Gustos" | "Ahorro";
};

export default function TransactionItem({ title, date, amount, type }: Props) {
  const isPositive = amount > 0;

  const colorMap: Record<string, string> = {
    Necesidad: "text-red-600",
    Gustos: "text-pink-500",
    Ahorro: "text-green-600",
  };

  return (
    <View className="flex-row justify-between items-center border-b border-gray-200 py-3">
      {/* Parte izquierda: título y fecha */}
      <View>
        <Text className="text-base text-textPrimary-800 font-medium">{title}</Text>
        <Text className="text-sm text-textSecondary-500">{date}</Text>
      </View>

      {/* Parte derecha: monto y tipo */}
      <View className="items-end">
        <Text className={`${isPositive ? "text-green-600" : "text-red-500"} font-semibold`}>
          {isPositive ? "+ " : "- "}S/ {Math.abs(amount).toFixed(2)}
        </Text>
        <Text className={`text-xs ${colorMap[type]}`}>{type}</Text>
      </View>
    </View>
  );
}
