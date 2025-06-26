import API from "./api";

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
  
  // Para cada categoría, obtener sus subcategorías
  const categoriesWithSubs = await Promise.all(
    categories.data.map(async (category: any) => {
      try {
        const subcategories = await getBudgetedSubcategories(budgetId, category.categoryId);
        return {
          ...category,
          subcategories: subcategories || []
        };
      } catch (error) {
        // Si no hay subcategorías (404), devolver array vacío
        return {
          ...category,
          subcategories: []
        };
      }
    })
  );
  
  return categoriesWithSubs;
};


interface CreateSubcategoryDto {
  name: string;
  categoryId: number;
  userId: number;
}

export async function createSubcategory(data: CreateSubcategoryDto) {
  const response = await API.post("/subcategories/user", data);
  return response.data; // ← debe contener el nuevo subcategoryId
}