import { Text, View } from "react-native";

interface Props {
  fullName?: string;
}

export default function Header({ fullName }: Props) {
  return (
    <View className="mb-2">
      <Text className="text-2xl font-bold text-textPrimary-800">
        {fullName ? `¡Hola, ${fullName}! 👋` : "¡Hola! 👋"}
      </Text>
    </View>
  );
}
