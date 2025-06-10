import { View } from "react-native";
import TransactionItem from "./TransactionItem";

type TransactionType = "Necesidad" | "Gustos" | "Ahorro";

type Transaction = {
  title: string;
  date: string;
  amount: number;
  type: TransactionType;
};

export default function TransactionList() {
  const data: Transaction[] = [
    { title: "Juegos", date: "Hoy 09:15", amount: -30, type: "Gustos" },
    { title: "Comida", date: "Hoy 09:15", amount: -50, type: "Necesidad" },
    { title: "Pago sueldo", date: "Hoy 09:15", amount: 600, type: "Ahorro" },
    { title: "Ropa", date: "Ayer 09:15", amount: -90, type: "Necesidad" },
  ];

  return (
    <View className="mt-4">
      {data.map((item, index) => (
        <TransactionItem key={index} {...item} />
      ))}
    </View>
  );
}
