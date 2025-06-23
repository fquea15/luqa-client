import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  getUserTransactions,
  getUserBudgetAllocations,
} from "@/shared/services/statisticsService";
import MonthlySummary from "@/components/statistics/MonthlySummary";
import ProgressBar from "@/components/statistics/ProgressBar";
import CategoryPerformance from "@/components/statistics/CategoryPerformance";
import TrendChart from "@/components/statistics/TrendChart";

const USER_ID = 2;

export default function StatisticsScreen() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [allocations, setAllocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [txRes, allocRes] = await Promise.all([
          getUserTransactions(USER_ID),
          getUserBudgetAllocations(USER_ID),
        ]);

        setTransactions(txRes);
        setAllocations(allocRes);
      } catch (error) {
        console.error("Error cargando estadísticas", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Text className="p-4">Cargando estadísticas...</Text>;

  const monthlyExpenses = transactions
    .filter((tx) => tx.transactionType === "Debit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const monthlyIncomes = transactions
    .filter((tx) => tx.transactionType === "Credit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const budgetedAmount = allocations.reduce((sum, a) => sum + a.assignedAmount, 0);
  const progress = (monthlyExpenses / budgetedAmount) * 100 || 0;

  return (
    <ScrollView className="bg-background" contentContainerStyle={{ padding: 16 }}>
      <MonthlySummary
        incomes={monthlyIncomes}
        expenses={monthlyExpenses}
        balance={monthlyIncomes - monthlyExpenses}
      />

      <ProgressBar
        progressPercentage={Math.round(progress)}
        total={budgetedAmount}
        spent={monthlyExpenses}
      />

      <CategoryPerformance allocations={allocations} transactions={transactions} />

      <TrendChart transactions={transactions} />
    </ScrollView>
  );
}
