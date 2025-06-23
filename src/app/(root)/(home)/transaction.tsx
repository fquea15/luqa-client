import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/ui/CustomButton";
import TransactionSummary from "@/components/transaction/TransactionSummary";
import TransactionList from "@/components/transaction/TransactionList";
import RecommendationBox from "@/components/transaction/RecommendationBox";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";

const TransactionScreen = () => {

  const { userBalance, updateUserBalance, setUserBalance} = useAppStore() as UserState;

  return (
    <SafeAreaView className="flex-1 bg-background-100">
      <ScrollView className="flex-1 px-4 ">
        <TransactionSummary />

        <Text className="text-lg font-semibold text-textPrimary-800 mb-2">Movimientos</Text>

        <TransactionList />
        <RecommendationBox />
      </ScrollView>
    </SafeAreaView>

    
  );
};

export default TransactionScreen;
