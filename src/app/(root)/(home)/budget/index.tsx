import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BudgetCard from "@/components/budget/BudgetCard";

export default function BudgetScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-100">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Text className="text-2xl font-bold text-textPrimary-800 mb-6">Mis Presupuestos</Text>
        <Text className="text-base text-textSecondary-500 mb-4">Enero 2025</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
