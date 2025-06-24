"use client";

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { createBudget, createSubcategory, createBudgetAllocation } from "@/shared/services/budgetService";

type Subcategory = {
  name: string;
  amount: number;
};

const categories = [
  { id: 1, name: "Necesidades" },
  { id: 2, name: "Gustos" },
  { id: 3, name: "Ahorros" },
];

export default function BudgetStepTwoScreen() {
  const { id } = useLocalSearchParams(); // id de categoría principal (si lo necesitas más adelante)
  const userId = 1; // temporal

  const [totalBudget, setTotalBudget] = useState(0);
  const [needs, setNeeds] = useState<Subcategory[]>([{ name: "", amount: 0 }]);
  const [wants, setWants] = useState<Subcategory[]>([{ name: "", amount: 0 }]);

  const totalNeeds = needs.reduce((sum, s) => sum + s.amount, 0);
  const totalWants = wants.reduce((sum, s) => sum + s.amount, 0);
  const savingsAmount = Math.max(0, totalBudget - totalNeeds - totalWants);

  const handleChange = (
    type: "needs" | "wants",
    index: number,
    field: "name" | "amount",
    value: string
  ) => {
    const list = type === "needs" ? [...needs] : [...wants];
    list[index] = {
      ...list[index],
      [field]: field === "amount" ? Number(value) : value,
    };
    type === "needs" ? setNeeds(list) : setWants(list);
  };

  const addSub = (type: "needs" | "wants") => {
    const list = type === "needs" ? [...needs] : [...wants];
    list.push({ name: "", amount: 0 });
    type === "needs" ? setNeeds(list) : setWants(list);
  };

  const handleSubmit = async () => {
    try {
      const monthYear = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`; // "2025-6"
      const budgetRes = await createBudget({
        userId,
        monthYear,
        status: "Open",
        budgetLimit: totalBudget,
        createdBy: userId,
      });

      const budgetId = budgetRes; // es un número (budgetId)

      // Necesidades
      for (const sub of needs) {
        const subRes = await createSubcategory({
          userId,
          categoryId: 1,
          name: sub.name,
          createdBy: userId,
        });
        await createBudgetAllocation({
          userId,
          budgetId,
          subcategoryId: subRes.subcategoryId,
          assignedAmount: sub.amount,
          createdBy: userId,
        });
      }

      // Gustos
      for (const sub of wants) {
        const subRes = await createSubcategory({
          userId,
          categoryId: 2,
          name: sub.name,
          createdBy: userId,
        });
        await createBudgetAllocation({
          userId,
          budgetId,
          subcategoryId: subRes.subcategoryId,
          assignedAmount: sub.amount,
          createdBy: userId,
        });
      }

      // Ahorros automáticos
      const ahorro = await createSubcategory({
        userId,
        categoryId: 3,
        name: "Ahorros automáticos",
        createdBy: userId,
      });
      await createBudgetAllocation({
        userId,
        budgetId,
        subcategoryId: ahorro.subcategoryId,
        assignedAmount: savingsAmount,
        createdBy: userId,
      });

      Alert.alert("Éxito", "Presupuesto guardado correctamente");
    } catch (error) {
      console.error("Error al guardar presupuesto:", error);
      Alert.alert("Error", "Ocurrió un error al guardar el presupuesto");
    }
  };

  return (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold mb-2">Paso 2: Presupuesto</Text>
      <Text className="text-sm mb-1">Ingresa tu presupuesto mensual total:</Text>

      <TextInput
        className="bg-white border p-2 mb-4 rounded-md"
        keyboardType="numeric"
        placeholder="Ej. 800"
        value={totalBudget.toString()}
        onChangeText={(v) => setTotalBudget(Number(v))}
      />

      {categories.map((cat) => (
        <View key={cat.id} className="mb-4">
          <Text className="font-semibold text-lg mb-2">{cat.name}</Text>

          {cat.id === 1 &&
            needs.map((item, i) => (
              <View key={i} className="mb-2">
                <TextInput
                  placeholder="Nombre"
                  className="bg-white border p-2 mb-1 rounded-md"
                  value={item.name}
                  onChangeText={(v) => handleChange("needs", i, "name", v)}
                />
                <TextInput
                  placeholder="Monto"
                  keyboardType="numeric"
                  className="bg-white border p-2 rounded-md"
                  value={item.amount.toString()}
                  onChangeText={(v) => handleChange("needs", i, "amount", v)}
                />
              </View>
            ))}

          {cat.id === 2 &&
            wants.map((item, i) => (
              <View key={i} className="mb-2">
                <TextInput
                  placeholder="Nombre"
                  className="bg-white border p-2 mb-1 rounded-md"
                  value={item.name}
                  onChangeText={(v) => handleChange("wants", i, "name", v)}
                />
                <TextInput
                  placeholder="Monto"
                  keyboardType="numeric"
                  className="bg-white border p-2 rounded-md"
                  value={item.amount.toString()}
                  onChangeText={(v) => handleChange("wants", i, "amount", v)}
                />
              </View>
            ))}

          {cat.id !== 3 && (
            <TouchableOpacity onPress={() => addSub(cat.id === 1 ? "needs" : "wants")}>
              <Text className="text-primary underline">+ Agregar subcategoría</Text>
            </TouchableOpacity>
          )}

          {cat.id === 3 && (
            <Text className="mt-2">Ahorros automáticos: S/. {savingsAmount.toFixed(2)}</Text>
          )}
        </View>
      ))}

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-primary p-3 rounded-xl items-center mt-6"
      >
        <Text className="text-white font-bold">Guardar presupuesto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
