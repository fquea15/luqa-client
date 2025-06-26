import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUserSubcategories } from "@/shared/services/subcategoryService";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    amount: number;
    description: string;
    transactionType: "Debit" | "Credit";
    subcategoryId?: number;
  }) => void;
};

export default function RegisterModal({ visible, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] =
    useState<"Debit" | "Credit">("Debit");
  const [subcategoryId, setSubcategoryId] = useState<number | null>(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const data = await getUserSubcategories();
        setSubcategories(data);
        if (data.length > 0) setSubcategoryId(data[0].subcategoryId);
      } catch (error) {
        console.error("Error al cargar subcategorías:", error);
      }
    };

    if (visible && transactionType === "Debit") {
      fetchSubcategories();
    }
  }, [visible, transactionType]);

  const handleSave = () => {
    const parsedAmount = parseFloat(amount);
    if (
      isNaN(parsedAmount) ||
      !description.trim() ||
      (transactionType === "Debit" && !subcategoryId)
    ) {
      alert("Completa todos los campos.");
      return;
    }

    onSubmit({
      amount: parsedAmount,
      description,
      transactionType,
      subcategoryId: transactionType === "Debit" ? subcategoryId! : undefined,
    });

    setAmount("");
    setDescription("");
    setTransactionType("Debit");
    setSubcategoryId(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 items-center justify-center bg-black/80 px-4">
        <View className="w-full rounded-3xl bg-white p-6">
          <Text className="mb-4 text-lg font-semibold text-primary-700 text-center">
            Registrar Movimiento
          </Text>

          <TextInput
            placeholder="Monto (S/)"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            className="mb-3 rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-800"
          />

          <TextInput
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            className="mb-3 rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-800"
          />

          {transactionType === "Debit" && (
            <ScrollView
              horizontal
              className="mb-3"
              contentContainerStyle={{ gap: 8 }}
              showsHorizontalScrollIndicator={false}
            >
              {subcategories.map((sub: any) => (
                <TouchableOpacity
                  key={sub.subcategoryId}
                  onPress={() => setSubcategoryId(sub.subcategoryId)}
                  className={`rounded-full px-4 py-2 ${
                    subcategoryId === sub.subcategoryId
                      ? "bg-primary-800"
                      : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      subcategoryId === sub.subcategoryId
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {sub.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <View className="mb-4 flex-row justify-around">
            <TouchableOpacity
              onPress={() => setTransactionType("Debit")}
              className={`rounded-full px-4 py-2 ${
                transactionType === "Debit" ? "bg-danger-600" : "bg-gray-300"
              }`}
            >
              <Text className="text-white font-semibold">Gasto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTransactionType("Credit")}
              className={`rounded-full px-4 py-2 ${
                transactionType === "Credit"
                  ? "bg-success-600"
                  : "bg-gray-300"
              }`}
            >
              <Text className="text-white font-semibold">Ingreso</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4 items-center">
            <TouchableOpacity
              className="flex-row items-center justify-center rounded-full border border-gray-400 bg-white px-6 py-3 shadow-sm"
              onPress={() => alert("Función de voz próximamente 🎙️")}
            >
              <Ionicons name="mic" size={22} color="#444" />
              <Text className="ml-2 font-semibold text-gray-700">
                Grabar por voz
              </Text>
            </TouchableOpacity>
            <Text className="mt-2 text-xs italic text-gray-500">
              Ejemplo: "20 en comida"
            </Text>
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="rounded-lg bg-gray-200 px-4 py-2"
              onPress={onClose}
            >
              <Text className="text-gray-800 font-medium">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-lg bg-primary-800 px-4 py-2"
              onPress={handleSave}
            >
              <Text className="text-white font-semibold">Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
