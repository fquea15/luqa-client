import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import BudgetSubcategory from "./BudgetSubcategory";

type Subcategory = {
  name: string;
  spent: number;
  total: number;
};

type Props = {
  title: string;
  percentage: number;
  spent: number;
  budget: number;
  subcategories?: Subcategory[];
  status: "Perfecto" | "Excedido" | "Sin presupuesto";
};

export default function BudgetCard({
  title,
  percentage,
  spent,
  budget,
  subcategories,
  status,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="bg-white rounded-2xl shadow px-4 py-5 mb-5">
      {/* Cabecera con estado */}
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-base font-semibold text-textPrimary-800">{title}</Text>
          <Text className="text-sm text-textSecondary-500">{percentage.toFixed(0)}% del total</Text>
        </View>

        <Text
          className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${status === "Perfecto" ? "text-success-600 bg-success-100" :
              status === "Excedido" ? "text-danger-600 bg-danger-100" :
              "text-warning-600 bg-warning-100"}
          `}
        >
          {status}
        </Text>
      </View>

      {/* Gastado y Presupuesto */}
      <View className="flex-row justify-between mb-1">
        <View>
          <Text className="text-xs text-textSecondary-500 mb-0.5">GASTADO</Text>
          <Text className="text-lg font-bold text-danger-600">S/. {spent.toFixed(2)}</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-textSecondary-500 mb-0.5">PRESUPUESTO</Text>
          <Text className="text-lg font-bold text-primary-700">S/. {budget.toFixed(2)}</Text>
        </View>
      </View>

      {/* Barra de progreso */}
      <View className="h-3 bg-background-300 rounded-full overflow-hidden mb-1">
        <View className="bg-primary-500 h-full" style={{ width: `${percentage}%` }} />
      </View>
      <Text className="text-xs text-primary-700 font-semibold">
        Progreso: {percentage.toFixed(1)}%
      </Text>
      <Text className="text-xs text-success-600 mt-1">
        Restante: S/. {(budget - spent).toFixed(2)}
      </Text>

      {/* Subcategorías */}
      {subcategories && subcategories.length > 0 && (
        <>
          <TouchableOpacity onPress={() => setExpanded(!expanded)} className="mt-3">
            <Text className="text-primary-600 text-sm font-medium">
              {expanded ? "Ocultar Detalles ▲" : "Ver Detalles ▼"}
            </Text>
          </TouchableOpacity>

          {expanded &&
            subcategories.map((sub, index) => (
              <BudgetSubcategory key={index} {...sub} />
            ))}
        </>
      )}
    </View>
  );
}
