import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MonthlySummary from "@/components/statistics/MonthlySummary";
import ProgressBar from "@/components/statistics/ProgressBar";
import CategoryPerformance from "@/components/statistics/CategoryPerformance";
import TrendChart from "@/components/statistics/TrendChart";
import {
  getUserBudget,
  getTransactions,
  getBudgetAllocations,
  getCategories,
} from "@/shared/services/statisticsService";

export default function StatisticScreen() {
  const [balance, setBalance] = useState<any | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [allocations, setAllocations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const b = await getUserBudget();
        const t = await getTransactions();
        const a = await getBudgetAllocations();
        const c = await getCategories();

        setBalance({
          totalIncome: b?.budgetLimit || 0,
          totalExpenses: t
            .filter((tx: any) => tx.transactionType === "Debit")
            .reduce((sum: number, tx: any) => sum + tx.amount, 0),
          totalSavings: 0, 
          balance:
            b?.budgetLimit -
            t.filter((tx: any) => tx.transactionType === "Debit")
              .reduce((sum: number, tx: any) => sum + tx.amount, 0),
        });

        setTransactions(t);
        setAllocations(a);
        setCategories(c);
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-background px-4 py-6">
      <Text className="text-2xl font-bold text-primary mb-4">Resumen del Mes</Text>
      {balance && <MonthlySummary balance={balance} />}
      <ProgressBar allocations={allocations} />
      <CategoryPerformance transactions={transactions} categories={categories} />
      <TrendChart transactions={transactions} />
    </ScrollView>
  );
}
