import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { getUserBudget } from "@/shared/services/budgetService";
import { getAllCategoriesWithSubcategories } from "@/shared/services/subcategoryService";
import { createBudgetAllocation } from "@/shared/services/budgetAllocationService";
import { createSubcategory } from "@/shared/services/subcategoryService";


// Tipos definidos directamente aquí
type Budget = {
  budgetId: number;
  userId: number;
  budgetLimit: number;
};

type Subcategory = {
  subcategoryId: number;
  name: string;
  amount: number | string;
};

type Category = {
  categoryId: number;
  name: string;
  type: "Expense" | "Savings";
  subcategories: Subcategory[];
};

export default function BudgetOverview() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const budgetData = await getUserBudget();
        setBudget(budgetData);

        const allCats = await getAllCategoriesWithSubcategories(budgetData.budgetId);
        setCategories(allCats);
      } catch (e) {
        Alert.alert("Error", "No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleBudgetChange = (val: string) =>
    setBudget((p: Budget | null) =>
      p ? { ...p, budgetLimit: parseInt(val) || 0 } : null
    );

  const handleAddSub = (catIdx: number) => {
    setCategories((prev: Category[]) => {
      const up = [...prev];
      up[catIdx].subcategories.push({
        name: "",
        amount: "",
        subcategoryId: 0,
      });
      return up;
    });
  };

  const handleSubChange = (
    catIdx: number,
    subIdx: number,
    field: "name" | "amount",
    val: string
  ) => {
    setCategories((prev: Category[]) => {
      const up = [...prev];
      up[catIdx].subcategories[subIdx][field] = val;
      return up;
    });
  };

  const sumAssigned = () =>
    categories
      .filter((c) => c.type !== "Savings")
      .reduce(
        (tot: number, c: Category) =>
          tot +
          c.subcategories.reduce(
            (s: number, sub: Subcategory) =>
              s + (parseFloat(sub.amount.toString()) || 0),
            0
          ),
        0
      );

  const getSavingsAmount = () =>
    (budget?.budgetLimit || 0) - sumAssigned();

  const handleSave = async () => {
  try {
    if (!budget) return;
    const bid = budget.budgetId;
    const uid = budget.userId;

    // 1. Guardar subcategorías para Necesidades y Gustos
    for (const c of categories.filter((c) => c.type !== "Savings")) {
      for (let sub of c.subcategories) {
        let subcategoryId = sub.subcategoryId;

        // Si es nueva subcategoría, primero la creamos
        if (!subcategoryId || subcategoryId === 0) {
          const created = await createSubcategory({
            name: sub.name,
            categoryId: c.categoryId,
            userId: uid,
          });
          subcategoryId = created.subcategoryId;
        }

        await createBudgetAllocation({
          budgetId: bid,
          subcategoryId,
          assignedAmount: parseFloat(sub.amount.toString()) || 0,
        });
      }
    }

    // 2. Guardar asignación automática para Ahorros
    const savCat = categories.find((c) => c.type === "Savings");
    if (savCat && savCat.subcategories.length > 0) {
      const savingsAmount = getSavingsAmount();
      const savingsSub = savCat.subcategories[0];
      await createBudgetAllocation({
        budgetId: bid,
        subcategoryId: savingsSub.subcategoryId,
        assignedAmount: savingsAmount,
      });
    }

    Alert.alert("Éxito", "Presupuesto guardado correctamente ✅");
  } catch (e) {
    console.error("Error en guardar presupuesto:", e);
    Alert.alert("Error", "No se pudo guardar el presupuesto");
  }
};

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
  <ScrollView className="px-4 py-8 bg-background-100 space-y-8">
    {/* Total Presupuesto */}
    <View className="bg-white rounded-2xl p-6 shadow-sm">
      <Text className="text-textPrimary-800 text-base font-semibold mb-2">
        ¿Cuánto deseas presupuestar este mes?
      </Text>
      <TextInput
        keyboardType="numeric"
        value={budget?.budgetLimit?.toString() || ""}
        onChangeText={handleBudgetChange}
        className="bg-background-50 border border-primary-200 text-textPrimary-800 px-4 py-3 rounded-xl"
        placeholder="Ej. 800"
        placeholderTextColor="#9AA5B1"
      />
    </View>

    {/* Categorías */}
    {categories.map((cat: Category, ci: number) => {
      const isSavings = cat.type === "Savings";
      return (
        <View
          key={cat.categoryId}
          className="bg-white rounded-2xl p-6 shadow-sm space-y-5"
        >
          <Text className="text-textPrimary-800 text-lg font-bold">
            {cat.name}
          </Text>

          {cat.subcategories.map((sub: Subcategory, si: number) => (
            <View key={si} className="mb-6">
              <TextInput
                editable={!isSavings}
                placeholder="Nombre de subcategoría"
                value={sub.name}
                onChangeText={(t) => handleSubChange(ci, si, "name", t)}
                className={`border px-4 py-3 rounded-xl mb-4 ${
                  isSavings
                    ? "bg-background-200 border-gray-200 text-gray-500"
                    : "bg-background-50 border-primary-200 text-textPrimary-800"
                }`}
              />
              <TextInput
                editable={!isSavings}
                placeholder="Monto asignado"
                keyboardType="numeric"
                value={sub.amount?.toString() || ""}
                onChangeText={(t) => handleSubChange(ci, si, "amount", t)}
                className={`border px-4 py-3 rounded-xl ${
                  isSavings
                    ? "bg-background-200 border-gray-200 text-gray-500"
                    : "bg-background-50 border-primary-200 text-textPrimary-800"
                }`}
              />
            </View>
          ))}

          {!isSavings && (
            <TouchableOpacity
              className="mt-2"
              onPress={() => handleAddSub(ci)}
            >
              <Text className="text-secondary-500 font-medium">
                + Agregar subcategoría
              </Text>
            </TouchableOpacity>
          )}

          {isSavings && (
            <Text className="mt-2 text-success-700 font-semibold">
              Ahorro : S/. {getSavingsAmount().toFixed(2)}
            </Text>
          )}
        </View>
      );
    })}

    <TouchableOpacity
      onPress={handleSave}
      className="bg-primary-500 py-4 rounded-2xl items-center shadow-md"
    >
      <Text className="text-white font-bold text-base">
        Guardar presupuesto
      </Text>
    </TouchableOpacity>
  </ScrollView>
);


}
