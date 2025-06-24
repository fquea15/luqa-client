// src/shared/services/homeService.ts
import API from "./api";

const userId = 1;

export const getBudget = async () => {
  const res = await API.get(`/Budgets/by-user/${userId}`);
  return res.data;
};

export const getTransactions = async () => {
  const res = await API.get(`/Transactions/by-user/${userId}`); 
  return res.data;
};

export const getUser = async () => {
  const res = await API.get(`/Users/${userId}`); 
  return res.data;
};

export const getTransactionsWithCategory = async (userId: number) => {
  try {
    const res = await API.get(`/Transactions/by-user/${userId}/with-category`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener distribución:", error);
    return [];
  }
};

export const getRecommendation = async (userId: number) => {
  console.log(" getRecommendation ejecutándose");
  const res = await API.get(`/Recommendations/${userId}`);
  return res.data;
};

export const createTransaction = async (data: {
  amount: number;
  description: string;
  transactionType: "Debit" | "Credit";
  userId: number;
}) => {
  const response = await API.post("/Transactions", data);
  return response.data;
};
