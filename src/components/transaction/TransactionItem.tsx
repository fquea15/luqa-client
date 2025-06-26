import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  description: string;
  amount: number;
  transactionType: "Credit" | "Debit";
  date: string;
};

export default function TransactionItem({
  description,
  amount,
  transactionType,
  date,
}: Props) {
  const isIncome = transactionType === "Credit";

  return (
    <View className="mb-3 flex-row items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm">
      <View className="flex-row items-center">
        <Ionicons
          name={isIncome ? "arrow-up-circle" : "arrow-down-circle"}
          size={24}
          color={isIncome ? "#16A34A" : "#DC2626"}
        />
        <View className="ml-3">
          <Text className="font-semibold text-base text-textPrimary">
            {description}
          </Text>
          <Text className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</Text>
        </View>
      </View>
      <Text className={`text-lg font-bold ${isIncome ? "text-green-600" : "text-red-600"}`}>
        {isIncome ? "+" : "-"}S/ {amount.toFixed(2)}
      </Text>
    </View>
  );
}
