import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import BudgetForm from "@/components/budget/BudgetForm";
import SubcategoryList from "@/components/budget/SubcategoryList";
import { Budget, Category, Subcategory } from "@/types/budget";
import { getUserBudget } from "@/shared/services/budgetService";
import {
  getAllCategoriesWithSubcategories,
  createSubcategory,
  getUserSubcategories,
} from "@/shared/services/subcategoryService";
import { createBudgetAllocation } from "@/shared/services/budgetAllocationService";

export default function BudgetOverview() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formVisible, setFormVisible] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [newSub, setNewSub] = useState<{
    [key: number]: { name: string; amount: string };
  }>({});

 const loadData = async () => {
  try {
    const budgetData = await getUserBudget();
    setBudget(budgetData);
    const allCats = await getAllCategoriesWithSubcategories(budgetData.budgetId);
    setCategories(allCats);
  } catch (e) {
    Alert.alert("Error", "No tienes un presupuesto definido para este mes");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadData();
}, []);


  const handleBudgetChange = (val: string) =>
    setBudget((p) =>
      p ? { ...p, budgetLimit: parseInt(val) || 0 } : null
    );

  const handleSubcategoryAmountChange = (
    categoryId: number,
    index: number,
    value: string
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.categoryId === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.map((sub, i) =>
                i === index ? { ...sub, amount: value } : sub
              ),
            }
          : cat
      )
    );
  };

  const sumAssigned = () =>
    categories
      .filter((c) => c.type !== "Savings")
      .reduce(
        (tot, c) =>
          tot +
          c.subcategories.reduce(
            (s, sub) => s + (parseFloat(sub.amount.toString()) || 0),
            0
          ),
        0
      );

  const getSavingsAmount = () =>
    (budget?.budgetLimit || 0) - sumAssigned();

  const handleAddNewSubcategory = (catId: number) => {
    const newSubData = newSub[catId];
    if (!newSubData?.name?.trim() || !newSubData?.amount?.trim()) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    const amount = parseFloat(newSubData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "El monto debe ser un número válido mayor a 0");
      return;
    }

    setCategories((prev) =>
      prev.map((c) =>
        c.categoryId === catId
          ? {
              ...c,
              subcategories: [
                ...c.subcategories,
                {
                  name: newSubData.name.trim(),
                  amount: newSubData.amount,
                  subcategoryId: 0,
                },
              ],
            }
          : c
      )
    );

    setNewSub((prev) => ({
      ...prev,
      [catId]: { name: "", amount: "" },
    }));
    setFormVisible((prev) => ({ ...prev, [catId]: false }));
  };

  const handleSave = async () => {
    if (saving || !budget) return;
    try {
      setSaving(true);

      const totalAsignado = sumAssigned();
      if (totalAsignado > budget.budgetLimit) {
        Alert.alert(
          "Advertencia",
          "El total asignado supera tu presupuesto"
        );
        return;
      }

      const existingSubs = await getUserSubcategories();

      for (const c of categories.filter((c) => c.type !== "Savings")) {
        for (let sub of c.subcategories) {
          const amount = parseFloat(sub.amount.toString());
          if (!sub.name || isNaN(amount) || amount <= 0) continue;

          let subcategoryId = sub.subcategoryId;
          if (!subcategoryId || subcategoryId === 0) {
            const alreadyExists = existingSubs.find(
              (s: Subcategory) =>
                s.name.toLowerCase().trim() ===
                  sub.name.toLowerCase().trim() &&
                s.categoryId === c.categoryId &&
                s.userId === budget.userId
            );

            if (alreadyExists) {
              subcategoryId = alreadyExists.subcategoryId;
            } else {
              const created = await createSubcategory({
                name: sub.name.trim(),
                categoryId: c.categoryId,
                userId: budget.userId,
              });
              subcategoryId = created.subcategoryId;
            }
          }

          await createBudgetAllocation({
            budgetId: budget.budgetId,
            subcategoryId,
            assignedAmount: amount,
          });
        }
      }

      const savCat = categories.find((c) => c.type === "Savings");
      if (savCat && savCat.subcategories.length > 0) {
        const savingsAmount = getSavingsAmount();
        if (savingsAmount > 0) {
          await createBudgetAllocation({
            budgetId: budget.budgetId,
            subcategoryId: savCat.subcategories[0].subcategoryId,
            assignedAmount: savingsAmount,
          });
        }
      }

      Alert.alert("Éxito", "Presupuesto guardado correctamente ");
      await loadData();
      setIsEditing(false); 
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo guardar el presupuesto. Intente nuevamente."
      );
    } finally {
      setSaving(false);
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
      {!isEditing ? (
        <>
          <Text className="text-xl font-bold text-textPrimary-800">
            Presupuesto Total: S/. {budget?.budgetLimit?.toFixed(2)}
          </Text>

          {categories.map((cat) => {
  const isSavings = cat.type === "Savings";
  const totalCat = isSavings
    ? getSavingsAmount()
    : cat.subcategories.reduce(
        (sum, sub) => sum + (parseFloat(sub.amount?.toString()) || 0),
        0
      );

            return (
              <View
                key={cat.categoryId}
                className="bg-white p-4 rounded-2xl shadow-md space-y-2"
              >
                <Text className="text-lg font-semibold text-textPrimary-700">
                  {cat.name} - S/. {totalCat.toFixed(2)}
                </Text>

                {cat.subcategories.map((sub, idx) => (
                  <View
                    key={idx}
                    className="flex-row justify-between border-b border-gray-200 py-2"
                  >
                    <Text className="text-textPrimary-800">
                      {sub.name}
                    </Text>
                    <Text className="text-textPrimary-700">
                      S/.{" "}
                      {parseFloat(
                        sub.amount?.toString() || "0"
                      ).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })}

          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            className="bg-primary-500 py-4 rounded-2xl items-center shadow-md mt-6"
          >
            <Text className="text-white font-bold text-base">
              Editar presupuesto
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <BudgetForm budget={budget} onChange={handleBudgetChange} />

          {categories.map((cat) => {
            const isSavings = cat.type === "Savings";
            const totalAmount = isSavings
              ? getSavingsAmount()
              : cat.subcategories.reduce(
                  (acc, s) =>
                    acc + (parseFloat(s.amount.toString()) || 0),
                  0
                );

            return (
              <SubcategoryList
                key={cat.categoryId}
                category={cat}
                isSavings={isSavings}
                totalAmount={totalAmount}
                formVisible={formVisible[cat.categoryId] || false}
                newSub={newSub[cat.categoryId] || {
                  name: "",
                  amount: "",
                }}
                onAmountChange={(i, val) =>
                  handleSubcategoryAmountChange(cat.categoryId, i, val)
                }
                onFormChange={(field, val) =>
                  setNewSub((prev) => ({
                    ...prev,
                    [cat.categoryId]: {
                      ...prev[cat.categoryId],
                      [field]: val,
                    },
                  }))
                }
                onAdd={() => handleAddNewSubcategory(cat.categoryId)}
                onCancel={() =>
                  setFormVisible((prev) => ({
                    ...prev,
                    [cat.categoryId]: false,
                  }))
                }
                onShowForm={() =>
                  setFormVisible((prev) => ({
                    ...prev,
                    [cat.categoryId]: true,
                  }))
                }
              />
            );
          })}

          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            className={`${
              saving ? "bg-gray-400" : "bg-primary-500"
            } py-4 rounded-2xl items-center shadow-md`}
          >
            <Text className="text-white font-bold text-base">
              {saving ? "Guardando..." : "Guardar presupuesto"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsEditing(false)}
            className="mt-4 py-3 border border-primary-400 rounded-xl items-center"
          >
            <Text className="text-primary-500 font-semibold">
              Cancelar edición
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
