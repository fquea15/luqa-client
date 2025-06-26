import API from "./api"; // tu axios o cliente HTTP

interface CreateBudgetAllocationDto {
  budgetId: number;
  subcategoryId: number;
  assignedAmount: number;
}

export async function createBudgetAllocation(data: CreateBudgetAllocationDto) {
  const response = await API.post("/budget-allocations/user", data);
  return response.data;
}
