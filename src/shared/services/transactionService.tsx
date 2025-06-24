// src/shared/services/transactionService.ts
import API from "./api";

export const createTransaction = async ({
  amount,
  description,
  transactionType,
  subcategoryId,
}: {
  amount: number;
  description: string;
  transactionType: "Debit" | "Credit";
  subcategoryId?: number;
}) => {
  const res = await API.post("/Transactions", {
    amount,
    description,
    transactionType,
    subcategoryId,
  });
  return res.data;
};
