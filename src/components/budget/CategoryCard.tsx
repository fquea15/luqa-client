import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Subcategory = {
  name: string;
  amount: number | string;
};

type CategoryCardProps = {
  name: string;
  total: number;
  type: "Expense" | "Savings";
  subcategories: Subcategory[];
  onAdd?: () => void; // solo para Expense
};

export default function CategoryCard({
  name,
  total,
  type,
  subcategories,
  onAdd,
}: CategoryCardProps) {
  return (
    <View className="bg-white rounded-2xl border border-black px-6 py-5 space-y-3">
      <View className="flex-row justify-between items-center">
        <Text className="text-secondary-600 font-semibold text-base">
          categoría {name.toLowerCase()}
        </Text>
        <Text className="text-textPrimary-800 font-bold text-base">{total}</Text>
      </View>

      {type === "Savings" ? (
        <View className="flex-row justify-between mt-1">
          <Text className="text-textPrimary-800 font-semibold">
            total de ahorro
          </Text>
          <Text className="text-textPrimary-800">{total}</Text>
        </View>
      ) : (
        <>
          {subcategories.map((sub, i) => (
            <View
              key={i}
              className="flex-row justify-between items-center"
            >
              <Text className="text-textPrimary-800 font-semibold">
                subcategoría {sub.name.toLowerCase()}
              </Text>
              <Text className="text-textPrimary-800">
                {parseFloat(sub.amount.toString())}
              </Text>
            </View>
          ))}

          {onAdd && (
            <TouchableOpacity onPress={onAdd}>
              <Text className="text-secondary-500 text-sm mt-1">
                + agregar subcategoría
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}
