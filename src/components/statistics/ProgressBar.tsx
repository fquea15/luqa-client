import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getBudgetAllocations } from "@/shared/services/statisticsService";

export default function ProgressBar() {
  const [spent, setSpent] = useState(0);
  const [assigned, setAssigned] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBudgetAllocations();
        const totalAssigned = data.reduce((acc: number, item: any) => acc + item.assignedAmount, 0);
        const totalSpent = data.reduce((acc: number, item: any) => acc + item.spentAmount, 0);
        setAssigned(totalAssigned);
        setSpent(totalSpent);
      } catch (error) {
        console.error("Error al obtener progreso:", error);
      }
    };

    fetchData();
  }, []);

  const percent = assigned > 0 ? (spent / assigned) * 100 : 0;

  return (
    <View className="mb-6">
      <Text className="text-base font-medium text-textPrimary-800 mb-2">Tu progreso:</Text>
      <Text className="text-sm text-textSecondary-500 mb-2">
        Has gastado el {percent.toFixed(0)}% de tu presupuesto
      </Text>

      <View className="h-4 w-full bg-background-300 rounded-full overflow-hidden mb-1">
        <View
          className="bg-warning-500 h-full rounded-full"
          style={{ width: `${percent}%` }}
        />
      </View>

      <Text className="text-sm text-textSecondary-500">
        S/ {spent.toFixed(2)} de S/ {assigned.toFixed(2)} presupuestado
      </Text>
    </View>
  );
}
