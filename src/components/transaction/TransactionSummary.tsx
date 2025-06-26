import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getBudget, getTransactions } from "@/shared/services/homeService";
import ProgressBar from "@/components/ui/ProgressBar"; // ruta según tu estructura

export default function TransactionSummary() {
  const [totalSpent, setTotalSpent] = useState(0);
  const [budgetAmount, setBudgetAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budget = await getBudget();
        setBudgetAmount(budget?.budgetLimit || 0); // campo correcto

        const transactions = await getTransactions();
        const total = transactions
          .filter((t: any) => t.transactionType === "Debit")
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        setTotalSpent(total);
      } catch (error) {
        console.error("Error al obtener resumen de transacciones:", error);
      }
    };

    fetchData();
  }, []);

  const remaining = budgetAmount - totalSpent;
  const isNegative = remaining < 0;
  const percentUsed = budgetAmount > 0 ? Math.round((totalSpent / budgetAmount) * 100) : 0;

  let message = "";
  if (percentUsed < 50) {
    message = "¡Vas bien! Solo has usado el " + percentUsed + "% de tu presupuesto.";
  } else if (percentUsed < 90) {
    message = "Atento, ya usaste el " + percentUsed + "% de tu presupuesto.";
  } else if (!isNegative) {
    message = "¡Cuidado! Has usado el " + percentUsed + "% del presupuesto.";
  } else {
    message = "Presupuesto superado en S/. " + Math.abs(remaining).toFixed(2);
  }

 return (
  <View className="bg-white shadow-sm rounded-xl p-4 mb-6">
    
    <Text className="text-sm text-textSecondary-500">TOTAL DE GASTOS:</Text>
    <Text className="text-xl font-bold text-primary-700">S/. {totalSpent.toFixed(2)}</Text>

    {budgetAmount > 0 ? (
      <>
        <Text
          className={`text-sm mt-1 ${
            isNegative ? "text-red-600 font-semibold" : "text-textSecondary-500"
          }`}
        >
          {isNegative
            ? `Has excedido tu presupuesto en S/. ${Math.abs(remaining).toFixed(2)}`
            : `Saldo disponible: S/. ${remaining.toFixed(2)} de S/. ${budgetAmount.toFixed(2)}`}
        </Text>

        <ProgressBar percentage={percentUsed} />

        <Text className={`text-sm mt-2 ${isNegative ? "text-red-600" : "text-success-700"}`}>
         {message}
        </Text>
      </>
    ) : (
      <Text className="text-sm text-gray-400 mt-1">
        No tienes un presupuesto asignado aún.
      </Text>
    )}
  </View>
);

}
