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
