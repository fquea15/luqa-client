import { useEffect, useState } from "react";
import { getUserBalance } from "../services/userBalanceService";
import { IUserBalance } from "../interfaces/user-interface";

export const useUserBalance = () => {
  const [userBalance, setUserBalance] = useState<IUserBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserBalance = async () => {
    try {
      const data = await getUserBalance(); 
      setUserBalance(data);
    } catch (err) {
      console.error("Error al cargar userBalance:", err);
      setError("No se pudo cargar el balance del usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBalance();
  }, []);

  return { userBalance, loading, error, refetch: fetchUserBalance };
};
