import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecordButton() {
  return (
    <TouchableOpacity className="bg-white border border-primary-700 px-5 py-3 rounded-full flex-row items-center justify-center mb-6 shadow-sm">
      <Ionicons name="mic-outline" size={22} color="#004E64" />
      <Text className="ml-2 text-primary-700 font-semibold text-base">Registrar Movimiento</Text>
    </TouchableOpacity>
  );
}
