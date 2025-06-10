import { Text, View } from "react-native";
import CustomButton from "@/components/ui/CustomButton";

const StatisticScreen = () => {
  return (
    <View className={"flex-1 items-center justify-center bg-background-100"}>
      <Text>Estadisticas de los movimeientos</Text>
      <CustomButton title={"Ver Mas"} />
    </View>
  );
};

export default StatisticScreen;
