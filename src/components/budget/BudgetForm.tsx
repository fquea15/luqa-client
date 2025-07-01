import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Budget, Category } from "@/types/budget";

interface Props {
  budget: Budget | null;
  onChange: (value: string) => void;
}

export default function BudgetForm({ budget, onChange }: Props) {
  return (
    <View className="bg-white rounded-2xl p-6 shadow-sm">
      <Text className="text-textPrimary-800 text-base font-semibold mb-2">
        ¿Cuánto deseas presupuestar este mes?
      </Text>
      <TextInput
        keyboardType="numeric"
        value={budget?.budgetLimit?.toString()}
        onChangeText={onChange}
        className="bg-background-50 border border-primary-200 text-textPrimary-800 px-4 py-3 rounded-xl"
        placeholder="Ej. 800"
        placeholderTextColor="#9AA5B1"
      />
    </View>
  );
}
