// src/shared/services/statisticsService.ts
import API from "./api";
const userId = 1; 

export const getUserBudget = async () => {
  try {
    const res = await API.get("/budget/by-user/1"); 
    return res.data;
  } catch (err: any) {
    console.error("Error en getUserBudget", err.response?.status, err.response?.data);
    throw err;
  }
};


export const getTransactions = async () => {
  try {
    const res = await API.get("/transactions/user");
    return res.data; 
  } catch (err: any) {
    console.error(" Error en getTransactions", err.response?.status, err.response?.data);
    throw err;
  }
};


export const getBudgetAllocations = async () => {
  try {
    const res = await API.get("/budget-allocations");
    return res.data;
  } catch (err: any) {
    console.error(" Error en getBudgetAllocations", err.response?.status, err.response?.data);
    throw err;
  }
};


export const getCategories = async () => {
  try {
    const res = await API.get("/categories");
    return res.data;
  } catch (err: any) {
    console.error(" Error en getCategories", err.response?.status, err.response?.data);
    throw err;
  }
};
