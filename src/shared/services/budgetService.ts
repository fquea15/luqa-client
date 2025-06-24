// src/services/budgetService.ts
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://localhost:5115/api";

export async function createBudget(data: {
  userId: number;
  monthYear: string;
  status: string;
  budgetLimit: number;
  createdBy: number;
}) {
  const response = await axios.post(`${API_URL}/Budgets`, data);
  return response.data;
}

export async function createSubcategory(data: {
  userId: number;
  categoryId: number;
  name: string;
  createdBy: number;
}) {
  const response = await axios.post(`${API_URL}/Subcategories`, data);
  return response.data;
}

export async function createBudgetAllocation(data: {
  userId: number;
  budgetId: number;
  subcategoryId: number;
  assignedAmount: number;
  createdBy: number;
}) {
  const response = await axios.post(`${API_URL}/BudgetAllocations`, data);
  return response.data;
}
