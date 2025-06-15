import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getBudgetAllocations } from "@/shared/services/statisticsService";

interface BudgetAllocation {
  allocationId: number;
  subcategoryName: string;
  assignedAmount: number;
  spentAmount: number;
  categoryType: string; 
}

export default function CategoryPerformance() {
  const [allocations, setAllocations] = useState<BudgetAllocation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const data = await getBudgetAllocations();
        const filtered = data.filter((item: BudgetAllocation) =>
          item.categoryType === "Need" || item.categoryType === "Expense"
        );

        setAllocations(filtered);
      } catch (err) {
        setError("Error al obtener asignaciones");
        console.error("❌ Error al obtener asignaciones:", err);
      }
    };

    fetchAllocations();
  }, []);

  if (error) {
    return (
      <View className="mb-6">
        <Text className="text-danger-500 text-sm">{error}</Text>
      </View>
    );
  }

  return (
    <View className="mb-6">
      <Text className="text-base font-medium text-textPrimary-800 mb-3">
        Desempeño presupuestal
      </Text>

      {allocations.map((item) => {
        const estado =
          item.spentAmount >= item.assignedAmount
            ? "🔴 Excedido"
            : "🟢 Dentro del presupuesto";
        const estadoColor =
          item.spentAmount >= item.assignedAmount
            ? "text-danger-500"
            : "text-success-700";

        return (
          <View
            key={item.allocationId}
            className="flex-row justify-between mb-2"
          >
            <View>
              <Text className="text-textPrimary-800">{item.subcategoryName}</Text>
              <Text className={`text-sm ${estadoColor}`}>{estado}</Text>
            </View>
            <Text className="text-textPrimary-800">
              S/ {item.spentAmount.toFixed(2)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
