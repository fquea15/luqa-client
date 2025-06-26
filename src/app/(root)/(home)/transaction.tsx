import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { getUserTransactions } from "@/shared/services/transactionService";
import { getUserBudget } from "@/shared/services/budgetService";

type Transaction = {
  transactionId: number;
  transactionType: "Debit" | "Credit";
  amount: number;
  description: string;
  transactionDate: string;
};

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [budget, setBudget] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const tx = await getUserTransactions();
      const bd = await getUserBudget();
      setTransactions(tx.reverse());
      setBudget(bd);
    };
    fetchData();
  }, []);

  const totalSpent = transactions
    .filter((tx) => tx.transactionType === "Debit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const available = (budget?.budgetLimit ?? 0) - totalSpent;
  const percentageUsed = Math.round((totalSpent / (budget?.budgetLimit ?? 1)) * 100);
  const visibleTransactions = transactions.slice(0, visibleCount);

  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/*  TOTAL DE GASTOS */}
      <View className="bg-white rounded-2xl p-5 mb-6 shadow-md border border-background-300">
        <Text className="text-sm text-textSecondary-500 font-semibold uppercase mb-1 tracking-widest">
          Total de gastos
        </Text>
        <Text className="text-xl font-extrabold text-secondary-500 mb-2">
          S/ {totalSpent.toFixed(2)}
        </Text>
        <Text className="text-sm text-textSecondary-600 mb-3">
          Saldo disponible: <Text className="font-semibold text-success-600">S/ {available.toFixed(2)}</Text> de S/ {budget?.budgetLimit.toFixed(2)}
        </Text>

        <View className="h-3 rounded-full bg-background-300 overflow-hidden mb-2">
          <View
            className="h-full bg-warning-500"
            style={{ width: `${percentageUsed}%` }}
          />
        </View>
        <Text className="text-sm text-success-700">
          {percentageUsed >= 100
            ? "¡Has excedido tu presupuesto!"
            : `Atento, ya usaste el ${percentageUsed}% de tu presupuesto.`}
        </Text>
      </View>

      {/*  MOVIMIENTOS */}
      <Text className="text-lg font-semibold text-textPrimary-800 mb-3">Movimientos</Text>

      {visibleTransactions.length === 0 && (
        <Text className="text-center text-textSecondary-500 text-sm">
          No hay movimientos registrados aún.
        </Text>
      )}

      {visibleTransactions.map((tx) => (
        <View
          key={tx.transactionId}
          className="bg-white rounded-xl px-4 py-3 mb-2 flex-row justify-between items-center shadow-sm"
        >
          <View>
            <Text className="text-textPrimary-800 font-medium">
              {tx.description}
            </Text>
            <Text className="text-xs text-textSecondary-500">
              {new Date(tx.transactionDate).toLocaleString("es-PE")}
            </Text>
          </View>
          <Text
            className={`text-base font-semibold ${
              tx.transactionType === "Debit"
                ? "text-danger-600"
                : "text-success-600"
            }`}
          >
            {tx.transactionType === "Debit" ? "- " : "+ "}S/ {tx.amount.toFixed(2)}
          </Text>
        </View>
      ))}

      {transactions.length > visibleCount ? (
        <TouchableOpacity
          className="mt-6 bg-primary-800 py-3 rounded-full items-center"
          onPress={() => setVisibleCount((prev) => prev + 5)}
        >
          <Text className="text-white font-bold">Ver más</Text>
        </TouchableOpacity>
      ) : transactions.length > 0 && visibleCount >= transactions.length ? (
        <Text className="text-center mt-6 text-textSecondary-500 text-sm">
          Ya no hay más movimientos.
        </Text>
      ) : null}
    </ScrollView>
  );
}
