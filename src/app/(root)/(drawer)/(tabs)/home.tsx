import DistributionBox from "@/components/home/DistributionBox";
import ExpenseChart from "@/components/home/ExpenseChart";
import Header from "@/components/home/Header";
import PointsCard from "@/components/home/PointsCard";
import RecordButton from "@/components/home/RecordButton";
import SummaryCards from "@/components/home/SummaryCards";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background-100 px-4 py-6">
      <Header />
      <SummaryCards />
      <RecordButton />
      <DistributionBox />
      <ExpenseChart />
      <PointsCard />
    </ScrollView>
  );
}
