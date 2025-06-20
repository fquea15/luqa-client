import { View } from "react-native";

type Props = {
  percentage: number;
};

export default function ProgressBar({ percentage }: Props) {
  let barColor = "bg-success-600";
  if (percentage >= 90) barColor = "bg-red-500";
  else if (percentage >= 50) barColor = "bg-yellow-400";

  return (
    <View className="w-full h-3 bg-gray-200 rounded-full mt-3">
      <View
        className={`h-full ${barColor} rounded-full`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </View>
  );
}
