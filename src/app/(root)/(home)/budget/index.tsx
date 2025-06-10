import { Text, View } from "react-native";
import { Link } from "expo-router";

const BudgetScreen = () => {
  return (
    <View className="flex h-screen w-screen items-center justify-center bg-background-100">
      <Text className={"text-primary-500"}>Lista de categorias</Text>
      <Link
        href={{
          pathname: "/(root)/(home)/budget/category/[id]",
          params: {
            id: "category-id",
          },
        }}
        className={"w-full rounded-lg bg-primary-400 px-5 py-2"}
      >
        <Text className={"text-textPrimary-100"}>Ver Moviemintos</Text>
      </Link>
    </View>
  );
};
export default BudgetScreen;
