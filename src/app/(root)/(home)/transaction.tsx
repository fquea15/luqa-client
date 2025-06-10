import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/ui/CustomButton";
import TransactionSummary from "@/components/transaction/TransactionSummary";
import TransactionList from "@/components/transaction/TransactionList";
import RecommendationBox from "@/components/transaction/RecommendationBox";

const TransactionScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-100">
      <ScrollView className="flex-1 px-4 ">
        <TransactionSummary />

        <Text className="text-lg font-semibold text-textPrimary-800 mb-2">Movimientos</Text>

        <TransactionList />

        <View className="my-6">
          <CustomButton title="Ver Más" />
        </View>

        <RecommendationBox />
      </ScrollView>
    </SafeAreaView>

    
  );
};

export default TransactionScreen;
