export type Budget = {
  budgetId: number;
  userId: number;
  budgetLimit: number;
};

export type Subcategory = {
  subcategoryId: number;
  name: string;
  amount: number | string;
  categoryId?: number;
  userId?: number;
};

export type Category = {
  categoryId: number;
  name: string;
  type: "Expense" | "Savings";
  subcategories: Subcategory[];
};

