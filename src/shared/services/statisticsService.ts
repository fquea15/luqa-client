// src/shared/services/statisticsService.ts
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const USER_ID = 2;

// 1. Obtener asignaciones
export const getBudgetAllocations = async (userId = USER_ID) => {
  const res = await axios.get(`${API_URL}/BudgetAllocations/by-user/${userId}`);
  return res.data;
};

// 2. Obtener categorías
export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/Categories`);
  return res.data;
};

// 3. Obtener subcategorías
export const getSubcategories = async () => {
  const res = await axios.get(`${API_URL}/Subcategories`);
  return res.data;
};

// 4. Obtener resumen del mes por tipo de categoría
export const getMonthlySummaryReal = async (userId = USER_ID) => {
  const txs = await getTransactions(userId);

  let income = 0;
  let expense = 0;

  for (const t of txs) {
    if (t.transactionType === "Credit") income += t.amount;
    else if (t.transactionType === "Debit") expense += t.amount;
  }

  const balance = income - expense;

  return { income, expense, balance };
};


export const getTransactions = async (userId = USER_ID) => {
  const res = await axios.get(`${API_URL}/Transactions/by-user/${userId}`);
  return res.data;
};


import API from "./api";

export const getUserTransactions = async (userId: number) => {
  const res = await API.get(`/Transactions/by-user/${userId}`);
  return res.data;
};

export const getUserBudgetAllocations = async (userId: number) => {
  const res = await API.get(`/BudgetAllocations/by-user/${userId}`);
  return res.data;
};
