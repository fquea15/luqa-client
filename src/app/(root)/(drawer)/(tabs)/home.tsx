import DistributionBox from "@/components/home/DistributionBox";
import ExpenseChart from "@/components/home/ExpenseChart";
import Header from "@/components/home/Header";
import LearningCard from "@/components/home/PointsCard";
import RegisterModal from "@/components/transactions/RegisterModal";
import API from "@/shared/services/api";
import { getBudget, getTransactions } from "@/shared/services/homeService";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const USER_ID = 2;
const USER_NAME = "nombre";

export default function HomeScreen() {
  const [budget, setBudget] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [weeklyExpense, setWeeklyExpense] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // state global
  const { userBalance, setUserBalance, updateUserBalance } = useAppStore() as UserState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, transactionsRes] = await Promise.all([getBudget(), getTransactions()]);

        setBudget(budgetRes);
        setTransactions(transactionsRes);

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const weeklyDebits = transactionsRes.filter((tx: any) => {
          const txDate = new Date(tx.transactionDate);
          return tx.transactionType === "Debit" && txDate >= sevenDaysAgo && txDate <= today;
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

  const handleSave = async ({ amount, description }: { amount: number; description: string }) => {
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
        <Text className="font-bold text-red-600">
          Hubo un error cargando los datos financieros.
        </Text>
        <Text className="2xl">
          {userBalance && `Tu saldo es ${userBalance.currency} ${userBalance.balance}`}
        </Text>
        <TouchableOpacity
          className="bg-primary-500 px-6 py-4"
          onPress={() => {
            setUserBalance({
              userId: 1,
              currency: "S/",
              balance: 1000,
            });
          }}
        >
          <Text className="text-white">Simular Carga de Datos</Text>
        </TouchableOpacity>
        {userBalance && (
          <TouchableOpacity
            className="bg-primary-500 px-6 py-4"
            onPress={() => {
              updateUserBalance({ userId: 1, currency: "S/", balance: userBalance?.balance + 100 });
            }}
          >
            <Text className="text-white">Actualizar monto</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <ScrollView className="bg-background min-h-screen p-4 pt-6">
      <Header fullName={USER_NAME} />

      {/* Tarjetas de resumen */}
      <View className="mb-4 flex-row justify-between">
        <View className="w-[48%] rounded-xl bg-primary-800 p-4">
          <Text className="text-sm text-white">Monto de Dinero</Text>
          <Text className="mt-1 text-2xl font-bold text-white">
            S/ {userBalance?.balance || budget.budgetLimit}
          </Text>
        </View>

        <View className="w-[48%] rounded-xl bg-secondary-500 p-4">
          <Text className="text-sm text-white">Egreso Semanal</Text>
          <Text className="mt-1 text-2xl font-bold text-white">- S/ {weeklyExpense}</Text>
        </View>
      </View>

      {/* Botón de registrar */}
      <TouchableOpacity
        className="mb-6 flex-row items-center justify-center rounded-full border border-primary-700 bg-white px-6 py-3 shadow-sm"
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="mic-outline" size={22} color="#004E64" />
        <Text className="ml-2 text-base font-semibold text-primary-700">Registrar Movimiento</Text>
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

      {/* Gráfico de dona real */}
      <ExpenseChart />
      <LearningCard />
    </ScrollView>
  );
}
