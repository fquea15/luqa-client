import axios from "axios";
import { Video } from "expo-av";
import Constants from "expo-constants";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export interface LessonPlayerProps {
  title: string;
  videoUrl: string;
  onVideoEnd?: () => void;
}

export default function LessonPlayer({ title, videoUrl, onVideoEnd }: LessonPlayerProps) {
  const { width } = Dimensions.get("window");

  const [lives, setLives] = useState<number | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const hasEndedRef = useRef(false); // Para evitar múltiples llamados

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/UserStats/2`);
      setLives(response.data.lives);
      setPoints(response.data.totalPoints);
    } catch (err) {
      console.error("❌ Error cargando user_stats:", err);
      setLives(0);
      setPoints(0);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleVideoEnd = async () => {
    if (!hasEndedRef.current) {
      hasEndedRef.current = true;
      try {
        // ✅ Sumar 10 puntos por ver el video
        await axios.put(`${API_URL}/UserStats/2/add-points`, { totalPoints: 10 });
        await fetchStats();
      } catch (err) {
        console.error("⚠️ Error sumando puntos por video:", err);
      }
      onVideoEnd?.();
    }
  };

  // ❌ Bloquear si no hay vidas
  if (lives !== null && lives <= 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background-100 px-5">
        <Text className="text-2xl font-bold text-danger-500 text-center mb-4">😢 ¡Sin vidas!</Text>
        <Text className="text-center text-textPrimary-700 mb-4">
          Necesitas al menos una vida para continuar viendo esta lección.
        </Text>
        <Image
          source={require("@/assets/logo/logo-main.png")}
          className="w-24 h-24 mt-2"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-100 px-5 pt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-primary-700">{title}</Text>
        <View className="flex-row space-x-4">
          <View className="flex-row items-center">
            <Text className="text-lg mr-1">💰</Text>
            <Text className="text-base text-success-600 font-semibold">
              {points !== null ? points : "..."}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-lg mr-1">❤️</Text>
            <Text className="text-base text-danger-500 font-semibold">
              {lives !== null ? lives : "..."}
            </Text>
          </View>
        </View>
      </View>

      <View className="items-center rounded-lg overflow-hidden">
        <Video
          source={{ uri: videoUrl }}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish && !status.isLooping) {
              handleVideoEnd();
            }
          }}
          style={{ width: width - 40, height: (width - 40) * (9 / 16), backgroundColor: "#000" }}
        />
      </View>

      <TouchableOpacity disabled className="mt-4 py-3 rounded-full bg-secondary-200 items-center">
        <Text className="text-secondary-800 font-semibold">Toca el video para empezar</Text>
      </TouchableOpacity>

      <View className="mt-6 px-4">
        <Text className="text-textPrimary-700 text-center text-base font-medium">
          Estás más cerca de tus metas de lo que crees.
        </Text>
        <Image
          source={require("@/assets/logo/logo-main.png")}
          className="w-20 h-20 self-center mt-4"
        />
      </View>
    </View>
  );
}
