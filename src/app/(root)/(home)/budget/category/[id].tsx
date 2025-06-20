import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { getBudgetSummaryByCategoryType } from "@/shared/services/budgetService";
import BudgetCard from "@/components/budget/BudgetCard";

export default function BudgetCategoryScreen() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBudgetSummaryByCategoryType();
        console.log(" Resultado agrupado:", result);
        setData(result);
      } catch (err) {
        console.error(" Error al cargar presupuesto:", err);
        setError("No se pudo cargar el resumen del presupuesto.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <View className="p-4">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="p-4">
        <Text className="text-textSecondary-500">Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold mb-4 text-textPrimary-800">
        Mis Presupuestos
      </Text>

      {["Necesidades", "Gustos", "Ahorros"].map((key) => {
        const item = data[key];
        return (
          <BudgetCard
            key={key}
            title={item.name}
            percentage={Math.round((item.budget / (data.Necesidades.budget + data.Gustos.budget + data.Ahorros.budget)) * 100)}
            spent={item.spent}
            budget={item.budget}
            status={item.status}
            subcategories={item.subcategories}
          />
        );
      })}
    </ScrollView>
  );
}
