// subcategoryService.ts

import API from "./routeService";
import { Subcategory } from "@/types/budget";

export const getUserSubcategories = async () => {
  const res = await API.get("/subcategories/user");
  return res.data;
};

export const getBudgetedSubcategories = async (
  budgetId: number,
  categoryId: number
) => {
  const url = `/subcategories/user/budget/${budgetId}/category/${categoryId}/subcategories`;
  const res = await API.get(url);
  return res.data;
};

export const getAllCategoriesWithSubcategories = async (budgetId: number) => {
  const categories = await API.get("/categories");

  const categoriesWithSubs = await Promise.all(
    categories.data.map(async (category: any) => {
      try {
        const subcategories = await getBudgetedSubcategories(
          budgetId,
          category.categoryId
        );
        return {
          ...category,
          subcategories: subcategories || [],
        };
      } catch (error) {
        return {
          ...category,
          subcategories: [],
        };
      }
    })
  );

  return categoriesWithSubs;
};

// Asegura que incluyes todos los campos esperados por el backend
export interface CreateSubcategoryDto {
  name: string;
  categoryId: number;
  userId: number;
  isActive?: number;
  createdBy?: number;
}

// ✅ Función final para crear subcategoría correctamente
export const createSubcategory = async (subcategory: CreateSubcategoryDto) => {
  // Asignar valores por defecto si no vienen desde el componente
  const payload = {
    ...subcategory,
    isActive: subcategory.isActive ?? 1,
    createdBy: subcategory.createdBy ?? subcategory.userId,
  };

  const response = await API.post("/subcategories/user", payload);
  return response.data;
};
