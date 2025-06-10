import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/home/Header";
import SummaryCards from "@/components/home/SummaryCards";
import RecordButton from "@/components/home/RecordButton";
import DistributionBox from "@/components/home/DistributionBox";
import ExpenseChart from "@/components/home/ExpenseChart";
import PointsCard from "@/components/home/PointsCard";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-100">
      <ScrollView className="flex-1 px-4 py-6">
        <Header />
        <SummaryCards />
        <RecordButton />
        <DistributionBox />
        <ExpenseChart />
        <PointsCard />
      </ScrollView>
    </SafeAreaView>
  );
}
