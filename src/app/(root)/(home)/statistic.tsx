import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthlySummary from "@/components/statistics/MonthlySummary";
import ProgressBar from "@/components/statistics/ProgressBar";
import CategoryPerformance from "@/components/statistics/CategoryPerformance";
import TrendChart from "@/components/statistics/TrendChart";

export default function StatisticScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-100">
      <ScrollView className="flex-1 px-4 py-6">
        <MonthlySummary />
        <ProgressBar />
        <CategoryPerformance />
        <TrendChart />
      </ScrollView>
    </SafeAreaView>
  );
}
