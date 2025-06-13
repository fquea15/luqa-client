// src/components/lesson/card-UseLive.tsx
import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const userId = 2; // Usuario fijo por ahora

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

  const addPoints = async (amount: number) => {
    try {
      await axios.put(`${API_URL}/UserStats/${userId}/add-points`, { points: amount });
      fetchStats();
    } catch (err) {
      console.error("❌ Error sumando puntos:", err);
    }
  };

  const removeLife = async () => {
    try {
      await axios.put(`${API_URL}/UserStats/${userId}/remove-life`);
      fetchStats();
    } catch (err) {
      console.error("❌ Error restando vida:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { lives, points, addPoints, removeLife, fetchStats };
};
