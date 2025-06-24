import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import Header from "@/components/home/Header";
import RegisterModal from "@/components/transactions/RegisterModal";
import { updateUserBalance } from "@/shared/services/userBalanceService";
import { useUserBalance } from "@/shared/hooks/useUserBalance";
import { useBoundStore } from "@/shared/store";

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { userBalance, loading, refetch } = useUserBalance(); 
  const setUserBalance = useBoundStore((state) => state.setUserBalance);

  const handleSave = async ({
    amount,
    description,
    transactionType,
  }: {
    amount: number;
    description: string;
    transactionType: "Debit" | "Credit";
  }) => {
    try {

      await updateUserBalance({ amount, transactionType });

      await refetch(); 
      alert("Movimiento registrado correctamente");
      setModalVisible(false);
    } catch (error) {
      console.error("Error al registrar movimiento:", error);
      alert("Error al guardar el movimiento.");
    }
  };

  if (loading) return <Text className="p-4">Cargando balance...</Text>;

  return (
    <ScrollView className="bg-background min-h-screen p-4 pt-6">
      <Header fullName="" />

      <View className="mb-4 flex-row justify-between">
        <View className="w-[48%] rounded-xl bg-primary-800 p-4">
          <Text className="text-sm text-white">Monto Disponible</Text>
          <Text className="mt-1 text-2xl font-bold text-white">
            S/ {userBalance?.balance ?? 0}
          </Text>
        </View>
        <View className="w-[48%] rounded-xl bg-secondary-500 p-4">
          <Text className="text-sm text-white">Egreso Semanal</Text>
          <Text className="mt-1 text-2xl font-bold text-white">
            - S/ {userBalance?.totalExpense ?? 0}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className="mb-6 flex-row items-center justify-center rounded-full border border-primary-700 bg-white px-6 py-3 shadow-sm"
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="mic-outline" size={22} color="#004E64" />
        <Text className="ml-2 text-base font-semibold text-primary-700">
          Registrar Movimiento
        </Text>
      </TouchableOpacity>

      <RegisterModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSave}
      />
    </ScrollView>
  );
}
