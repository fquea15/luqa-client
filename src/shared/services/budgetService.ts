import axios from "axios"; 
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const USER_ID = 2;

export const getBudgetAllocations = async (userId = USER_ID) => {
  const res = await axios.get(`${API_URL}/BudgetAllocations/by-user/${userId}`);
  return res.data;
};

export const getSubcategories = async () => {
  const res = await axios.get(`${API_URL}/Subcategories`);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/Categories`);
  return res.data;
};

// ✅ NUEVA FUNCIÓN para obtener el presupuesto actual (limite total)
export const getBudgetsByUserId = async (userId = USER_ID) => {
  const res = await axios.get(`${API_URL}/Budgets/by-user/${userId}`);
  const budgets = res.data;

  // Buscar el presupuesto que esté "Open"
  const activeBudget = budgets.find((b: any) => b.status === "Open");
  return {
    budgetId: activeBudget?.budgetId,
    budgetLimit: activeBudget?.budgetLimit || 0,
  };
};

type SubcategoryData = {
  name: string;
  spent: number;
  total: number;
};

type CategorySummary = {
  name: string;
  subcategories: SubcategoryData[];
  spent: number;
  budget: number;
  status: "Perfecto" | "Excedido" | "Sin presupuesto";
};

export const getBudgetSummaryByCategoryType = async (userId = USER_ID) => {
  const [allocations, subcategories, categories] = await Promise.all([
    getBudgetAllocations(userId),
    getSubcategories(),
    getCategories(),
  ]);

  const result: Record<"Necesidades" | "Gustos" | "Ahorros", CategorySummary> = {
    Necesidades: { name: "Necesidades", subcategories: [], spent: 0, budget: 0, status: "Sin presupuesto" },
    Gustos: { name: "Gustos", subcategories: [], spent: 0, budget: 0, status: "Sin presupuesto" },
    Ahorros: { name: "Ahorros", subcategories: [], spent: 0, budget: 0, status: "Sin presupuesto" },
  };

  for (const allocation of allocations) {
    const subcat = subcategories.find((s: any) => s.subcategoryId === allocation.subcategoryId);
    const category = categories.find((c: any) => c.categoryId === subcat?.categoryId);
    const name = category?.name;

    if (!name || !(name in result)) continue;

    const sub = {
      name: subcat?.name || "Subcategoría",
      spent: allocation.spentAmount || 0,
      total: allocation.assignedAmount || 0,
    };

    result[name as keyof typeof result].subcategories.push(sub);
    result[name as keyof typeof result].spent += sub.spent;
    result[name as keyof typeof result].budget += sub.total;
  }

  // Calcular estado
  for (const key of ["Necesidades", "Gustos", "Ahorros"] as const) {
    const item = result[key];
    if (item.budget === 0) item.status = "Sin presupuesto";
    else if (item.spent > item.budget) item.status = "Excedido";
    else item.status = "Perfecto";
  }

  console.log("📊 Resultado agrupado:", result);
  return result;
};
