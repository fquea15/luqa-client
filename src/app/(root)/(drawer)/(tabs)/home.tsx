import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ChevronDown, ChevronUp } from "lucide-react-native";

import Header from "@/components/home/Header";
import RegisterModal from "@/components/transactions/RegisterModal";
import RecentTransactionItem from "@/components/home/RecentTransactionItem";
import ExpenseChart from "@/components/home/ExpenseChart";
import PointsCard from "@/components/home/PointsCard";

import { updateUserBalance } from "@/shared/services/userBalanceService";
import { useUserBalance } from "@/shared/hooks/useUserBalance";
import { useBoundStore } from "@/shared/store";
import {
  createTransaction,
  getUserTransactions,
} from "@/shared/services/transactionService";
import { getUserInfo } from "@/shared/services/userService";

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [showMovements, setShowMovements] = useState(true);
  const [userName, setUserName] = useState("");

  const { userBalance, loading, refetch } = useUserBalance();
  const setUserBalance = useBoundStore((state) => state.setUserBalance);
  const router = useRouter();

  const fetchUserName = async () => {
    try {
      const user = await getUserInfo();
      setUserName(user.fullName);
    } catch (err) {
      console.error("Error al obtener nombre de usuario", err);
    }
  };

  const handleSave = async ({
    amount,
    description,
    transactionType,
    subcategoryId,
  }: {
    amount: number;
    description: string;
    transactionType: "Debit" | "Credit";
    subcategoryId?: number;
  }) => {
    try {
      const payload = {
        amount,
        description,
        transactionType,
        subcategoryId: transactionType === "Debit" ? subcategoryId! : 1,
        budgetId: 2,
        transactionDate: new Date().toISOString(),
      };

      console.log("📌 Enviando transacción:", payload);

      await createTransaction(payload);
      await updateUserBalance({ amount, transactionType });
      await refetch();
      await fetchTransactions();

      alert("Movimiento registrado correctamente");
      setModalVisible(false);
    } catch (error) {
      console.error("Error al registrar movimiento:", error);
      alert("Error al guardar el movimiento.");
    }
  };

  const fetchTransactions = async () => {
    try {
      const data = await getUserTransactions();
      setRecentTransactions(data.reverse().slice(0, 2));
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchUserName();
  }, []);

  if (loading) return <Text className="p-4">Cargando balance...</Text>;

  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={{ padding: 16, paddingTop: 24, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <Header fullName={userName} />

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

      <View className="bg-white rounded-xl shadow-sm mt-4 p-4">
        <TouchableOpacity
          onPress={() => setShowMovements(!showMovements)}
          className="flex-row items-center justify-between mb-2"
        >
          <View className="flex-row items-center space-x-2">
            <Text className="text-primary-800 font-semibold">
              {showMovements ? "Ocultar movimientos" : "Mostrar movimientos"}
            </Text>
          </View>
          {showMovements ? (
            <ChevronUp size={16} color="#004E64" />
          ) : (
            <ChevronDown size={16} color="#004E64" />
          )}
        </TouchableOpacity>

        {showMovements &&
          recentTransactions.map((tx: any) => (
            <RecentTransactionItem
              key={tx.transactionId}
              description={tx.description}
              amount={tx.amount}
              type={tx.transactionType}
              date={tx.transactionDate}
            />
          ))}

        {showMovements && (
          <TouchableOpacity
            onPress={() => router.push("/(root)/(home)/transactions")}
            className="mt-3"
          >
            <Text className="text-success-600 font-semibold text-center text-sm uppercase">
              Ver todos
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold text-textPrimary-800 mb-3">
          Gastos más frecuentes
        </Text>
        <ExpenseChart />
      </View>

      <View className="mt-6">
        <PointsCard />
      </View>
    </ScrollView>
  );
}