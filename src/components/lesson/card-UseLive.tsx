// ✅ Archivo: src/components/lesson/card-UseLive.tsx
import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const userId = 3; // Por ahora fijo

export const useUserStats = () => {
  const [lives, setLives] = useState<number>(5);
  const [points, setPoints] = useState<number>(0);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/UserStats/${userId}`);
      setLives(res.data.lives);
      setPoints(res.data.totalPoints);
    } catch (error) {
      console.error("❌ Error al cargar stats:", error);
    }
  };

  const redeemLives = async () => {
    try {
      const res = await axios.post(`${API_URL}/UserStats/${userId}/redeem-lives`);
      console.log("✅ Canje exitoso:", res.data);
      await fetchStats(); // refrescar stats actualizadas
      return true;
    } catch (err: any) {
      console.error("⚠️ No se pudo canjear vidas:", err?.response?.data || err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { lives, points, fetchStats, redeemLives }; // 👈 AGREGA ESTO
};
