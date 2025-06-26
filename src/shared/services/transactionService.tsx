// src/shared/services/transactionService.ts
import API from "./routeService";

export const createTransaction = async (data: {
  amount: number;
  description: string;
  transactionType: "Debit" | "Credit";
  subcategoryId: number;
  budgetId: number;
  transactionDate: string;
}) => {
  const res = await API.post("/transactions/user", data);
  return res.data;
};

export const getUserTransactions = async () => {
  const res = await API.get("/transactions/user");
  console.log(res);
  return res.data;
};

export const getSpendingByCategory = async (): Promise<
  { categoryName: string; amount: number }[]
> => {
  const res = await API.get("/transactions/user");
  const transactions = res.data;

  // Agrupar por categoríaId usando un Map
  const categoryTotals: Record<string, number> = {};

  for (const tx of transactions) {
    if (tx.transactionType === "Debit") {
      const catName = tx.subcategory?.category?.name ?? "Otro";

      categoryTotals[catName] = (categoryTotals[catName] || 0) + tx.amount;
    }
  }

  // Convertir a arreglo
  return Object.entries(categoryTotals).map(([categoryName, amount]) => ({
    categoryName,
    amount,
  }));
};
