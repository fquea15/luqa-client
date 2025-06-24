import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    amount: number;
    description: string;
    transactionType: "Debit" | "Credit";
  }) => void;
};

export default function RegisterModal({ visible, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] =
    useState<"Debit" | "Credit">("Debit");

  const handleSave = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || !description.trim()) {
      alert("Por favor ingresa un monto y una descripción válida.");
      return;
    }

    onSubmit({ amount: parsedAmount, description, transactionType });

    // Reset
    setAmount("");
    setDescription("");
    setTransactionType("Debit");
    onClose(); 
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 items-center justify-center bg-black bg-opacity-40 px-4">
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
                transactionType === "Credit" ? "bg-success-600" : "bg-gray-300"
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
