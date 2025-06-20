import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TransactionItem from "./TransactionItem";
import { getTransactions } from "@/shared/services/homeService";

type TransactionType = "Necesidad" | "Gustos" | "Ahorro";

type Transaction = {
  title: string;
  date: string;
  amount: number;
  type: TransactionType;
  transactionType: "Debit" | "Credit";
};

const ITEMS_PER_PAGE = 5;

export default function TransactionList() {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();

        const result = data
          .map((t: any) => {
            const dateObj = new Date(t.transactionDate);
            const formatted = dateObj.toLocaleString("es-PE", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });

            return {
              title: t.description,
              date: formatted,
              amount: t.amount,
              type: t.categoryType,
              transactionType: t.transactionType,
            };
          })
          .reverse(); // último primero

        setAllTransactions(result);
      } catch (error) {
        console.error("Error al obtener transacciones:", error);
      }
    };

    fetchData();
  }, []);

  const visibleTransactions = allTransactions.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <View className="mt-4">
      {visibleTransactions.map((item, index) => (
        <TransactionItem key={index} {...item} />
      ))}

      {visibleCount < allTransactions.length && (
        <TouchableOpacity
          onPress={handleShowMore}
          className="bg-primary-700 mt-4 py-3 rounded-full items-center"
        >
          <Text className="text-white font-semibold">Ver más</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
