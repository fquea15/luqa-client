//src/shared/services/categoryservice.ts
import API from "./routeService";

export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data;
};

export const getSubcategoriesByCategory = async (budgetId: number, categoryId: number) => {
  const response = await API.get(`/subcategories/user/budget/${budgetId}/category/${categoryId}/subcategories`);
  return response.data;
};