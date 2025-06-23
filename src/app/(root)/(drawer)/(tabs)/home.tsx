import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Header from "@/components/home/Header";
import { getBudget, getTransactions } from "@/shared/services/homeService";
import RegisterModal from "@/components/transactions/RegisterModal";
import DistributionBox from "@/components/home/DistributionBox";
import ExpenseChart from "@/components/home/ExpenseChart";
import LearningCard from "@/components/home/PointsCard";
import API from "@/shared/services/api";
import { Ionicons } from "@expo/vector-icons";

const USER_ID = 2;
const USER_NAME = "nombre";

export default function HomeScreen() {
  const [budget, setBudget] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [weeklyExpense, setWeeklyExpense] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, transactionsRes] = await Promise.all([
          getBudget(),
          getTransactions(),
        ]);

        setBudget(budgetRes);
        setTransactions(transactionsRes);

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const weeklyDebits = transactionsRes.filter((tx: any) => {
          const txDate = new Date(tx.transactionDate);
          return (
            tx.transactionType === "Debit" &&
            txDate >= sevenDaysAgo &&
            txDate <= today
          );
        });

        const total = weeklyDebits.reduce(
          (sum: number, tx: any) => sum + tx.amount,
          0
        );
        setWeeklyExpense(total);
      } catch (err) {
        console.error("No se recibió presupuesto o transacciones válidas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async ({
    amount,
    description,
  }: {
    amount: number;
    description: string;
  }) => {
    try {
      await API.post("/Transactions", {
        userId: USER_ID,
        budgetId: budget.budgetId,
        subcategoryId: 1,
        transactionDate: new Date().toISOString(),
        amount,
        transactionType: "Debit",
        description,
        isActive: true,
        createdBy: USER_ID,
        updatedBy: USER_ID,
      });

      alert("Movimiento registrado");
      setModalVisible(false);
    } catch (error) {
      console.error("Error al registrar movimiento", error);
    }
  };

  if (loading) return <Text className="p-4">Cargando...</Text>;

  if (!budget) {
    return (
      <View className="p-4">
        <Header fullName={USER_NAME} />
        <Text className="text-red-600 font-bold">
          Hubo un error cargando los datos financieros.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={{ padding: 16, paddingBottom: 40, flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1">
        <Header fullName={USER_NAME} />

        {/* Tarjetas de resumen */}
        <View className="flex-row justify-between mb-4 mt-4">
          <View className="bg-primary-800 rounded-xl p-4 w-[48%]">
            <Text className="text-white text-sm">Monto de Dinero</Text>
            <Text className="text-white text-2xl font-bold mt-1">
              S/ {budget.budgetLimit.toFixed(2)}
            </Text>
          </View>

          <View className="bg-secondary-500 rounded-xl p-4 w-[48%]">
            <Text className="text-white text-sm">Egreso Semanal</Text>
            <Text className="text-white text-2xl font-bold mt-1">
              - S/ {weeklyExpense.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Botón de registrar */}
        <TouchableOpacity
          className="bg-white border border-primary-700 px-6 py-3 rounded-full flex-row items-center justify-center mb-6 shadow-sm"
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="mic-outline" size={22} color="#004E64" />
          <Text className="ml-2 text-primary-700 font-semibold text-base">
            Registrar Movimiento
          </Text>
        </TouchableOpacity>

        {/* Modal */}
        <RegisterModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSave}
        />

        {/* Distribución 50/30/20 */}
        <DistributionBox
          needs={budget.budgetLimit * 0.5}
          wants={budget.budgetLimit * 0.3}
          savings={budget.budgetLimit * 0.2}
        />

        {/* Gráfico de gastos reales */}
        <ExpenseChart />

        {/* Tarjeta de puntos */}
        <LearningCard />
      </View>
    </ScrollView>
  );
}
