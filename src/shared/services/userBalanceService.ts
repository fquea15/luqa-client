// src/shared/services/userBalanceService.ts
import API from "./api";
import { IUserBalance } from "../interfaces/user-interface";

export const getUserBalance = async (): Promise<IUserBalance> => {
  const res = await API.get("/user-balances");
  return res.data;
};

export const updateUserBalance = async (data: {
  amount: number;
  transactionType: "Debit" | "Credit";
}) => {
  const res = await API.put("/user-balances", data);
  return res.data;
};

export const getUserBudget = async () => {
  const res = await API.get("/budget/user");
  return res.data;
};

export const updateUserBudget = async (budgetId: number, budgetLimit: number) => {
  const res = await API.put(`/budget/${budgetId}`, { budgetLimit });
  return res.data;
};