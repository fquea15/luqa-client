import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Category, Subcategory } from "@/types/budget";

interface Props {
  category: Category;
  isSavings: boolean;
  totalAmount: number;
  formVisible: boolean;
  newSub: { name: string; amount: string };
  onAmountChange: (index: number, val: string) => void;
  onFormChange: (field: "name" | "amount", val: string) => void;
  onAdd: () => void;
  onCancel: () => void;
  onShowForm: () => void;
}

export default function SubcategoryList({
  category,
  isSavings,
  totalAmount,
  formVisible,
  newSub,
  onAmountChange,
  onFormChange,
  onAdd,
  onCancel,
  onShowForm,
}: Props) {
  return (
    <View className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <Text className="text-textPrimary-800 text-lg font-bold">
        {category.name} - S/. {totalAmount.toFixed(2)}
      </Text>

      {category.subcategories.map((sub, si) => (
        <View key={si} className="space-y-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-textPrimary-800 font-medium flex-1">{sub.name}</Text>
            {!isSavings ? (
              <TextInput
                keyboardType="numeric"
                value={sub.amount.toString()}
                onChangeText={(val) => onAmountChange(si, val)}
                className="bg-background-50 border border-primary-200 text-textPrimary-800 px-3 py-2 rounded-lg w-24 text-right"
                placeholder="0"
              />
            ) : (
              <Text className="text-textPrimary-800 font-bold">
                S/. {parseFloat(sub.amount.toString()).toFixed(2)}
              </Text>
            )}
          </View>
        </View>
      ))}

      {!isSavings && (
        <>
          {formVisible ? (
            <View className="mt-6 border-t border-gray-200 pt-6 space-y-">
              <TextInput
                placeholder="Nombre de subcategoría"
                value={newSub.name}
                onChangeText={(t) => onFormChange("name", t)}
                className="border px-4 py-3 rounded-xl bg-background-50 border-primary-200 text-textPrimary-800"
              />

              <View className="mt-3">
                <TextInput
                  placeholder="Monto asignado"
                  keyboardType="numeric"
                  value={newSub.amount}
                  onChangeText={(t) => onFormChange("amount", t)}
                  className="border px-4 py-3 rounded-xl bg-background-50 border-primary-200 text-textPrimary-800"
                />
              </View>

              <View className="flex-row justify-between pt-2">
                <TouchableOpacity
                  className="bg-primary-500 px-4 py-2 rounded-xl"
                  onPress={onAdd}
                >
                  <Text className="text-white font-bold">Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2" onPress={onCancel}>
                  <Text className="text-gray-600 font-bold">Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              className="mt-4 border-t border-gray-200 pt-4"
              onPress={onShowForm}
            >
              <Text className="text-secondary-500 font-medium">
                + Agregar subcategoría
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}
