import { getUserStats, redeemLives as redeemLivesAPI } from "@/shared/services/userStatsService";
import { FontAwesome5 } from "@expo/vector-icons";
import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

const MOTIVATIONAL_PHRASES = [
  "Hoy puede ser el primer paso hacia tu libertad financiera. ",
  "Cada vez que eliges aprender en lugar de rendirte, te haces más fuerte. ",
  "La educación financiera es la herramienta que transforma sueños en planes. ",
  "El éxito no llega de la noche a la mañana, pero tú ya comenzaste. ",
  "Invertir en ti es la mejor inversión que puedes hacer. ",
  "Tus decisiones de hoy crean tu tranquilidad de mañana. ",
  "Saber administrar el dinero es una forma de amor propio. ",
  "Cada lección que completas es una victoria silenciosa. ",
  "No estás solo. Muchos estamos aprendiendo a construir un mejor futuro. ",
  "La disciplina hoy es libertad mañana. ",
  "Tu esfuerzo de hoy será tu orgullo de mañana. ",
  "Paso a paso, estás construyendo tu independencia. ",
  "No es magia, es constancia. ",
  "Gastar menos no es sacrificio, es estrategia. ",
  "El conocimiento es el nuevo oro. ",
  "Ahorrar no es dejar de vivir, es elegir cómo vivir mejor. ",
  "Cada moneda que decides guardar es un acto de sabiduría. 🪙",
  "Hoy aprendes, mañana decides con poder. ",
  "No te compares con otros. Tu progreso es único. ",
  "Ser joven y responsable con tu dinero es un superpoder. ",
  "No importa cuán lento avances, no te estás deteniendo. ",
  "Responder una pregunta bien te acerca más a tu meta. ",
  "Tus finanzas reflejan tus prioridades. Haz que valga la pena. ",
  "Luqa va contigo en cada paso hacia tu libertad. ",
  "No estás viendo un video, estás invirtiendo en ti. ",
  "Las finanzas también son parte del autocuidado. ",
  "Hoy eliges formarte, mañana nadie te engañará. ",
  "Organizar tu dinero es organizar tu vida. ",
  "Cada punto que sumas es una decisión correcta. ",
  "Fallar no es perder, es aprender. ",
  "Aprender finanzas te da voz, fuerza y seguridad. ",
  "Si sabes usar tu dinero, el dinero no te usará a ti. ",
  "Tu futuro te dará las gracias por este momento. ",
  "Tú puedes. Lo estás haciendo. No te detengas. ",
  "No necesitas saber todo, solo avanzar un paso más. ",
  "Cada esfuerzo que haces hoy te hará sonreír mañana. ",
  "Los errores no definen, enseñan. ",
  "Lo importante no es cuánto ganas, sino cuánto entiendes. ",
  "Ya diste un paso que muchos aún no se atreven. ",
  "Tú decides: gastar sin rumbo o avanzar con propósito. ",
];

export interface LessonPlayerProps {
  title: string;
  videoUrl: string;
  onVideoEnd?: () => void;
}

export default function LessonPlayer({ title, videoUrl, onVideoEnd }: LessonPlayerProps) {
  const userId = 3;
  const { width } = Dimensions.get("window");
  const hasEndedRef = useRef(false);
  const phrase = useRef(
    MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)]
  ).current;

  const [points, setPoints] = useState<number | null>(null);
  const [lives, setLives] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoKey, setVideoKey] = useState(0);

  const fetchStats = async () => {
    try {
      const stats = await getUserStats(userId);
      setPoints(stats.totalPoints);
      setLives(stats.lives);
    } catch (err) {
      console.error("❌ Error al obtener stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleVideoEnd = async () => {
    if (!hasEndedRef.current) {
      hasEndedRef.current = true;
      onVideoEnd?.();
    }
  };

  return (
    <View className="flex-1 px-5 pt-6">
      {lives !== null && lives <= 0 ? (
        <View className="flex-1 items-center justify-center bg-background-100 px-5 space-y-4">
          <Text className="text-3xl font-extrabold text-danger-500 text-center">¡Te quedaste sin vidas!</Text>
          <Text className="text-textSecondary-500 text-center text-base leading-6">
            Necesitas al menos una vida para continuar aprendiendo. Puedes canjear puntos para obtener más.
          </Text>

          <View className="bg-background-200 p-4 rounded-xl w-full max-w-md shadow-md border border-background-300">
            <Text className="text-center text-textPrimary-800 font-semibold text-base mb-2">Puntos disponibles:</Text>
            <Text className="text-center text-success-700 text-2xl font-bold">{points ?? 0} pts</Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              if ((points ?? 0) < 500) {
                Alert.alert("⚠️ No tienes suficientes puntos", "Necesitas al menos 500 puntos para canjear 5 vidas.");
                return;
              }

              try {
                setLoading(true);
                await redeemLivesAPI(userId);
                Alert.alert("¡Canje exitoso!", "Has ganado 5 vidas por 500 puntos.");
                await fetchStats();
                setVideoKey(prev => prev + 1);
              } catch {
                Alert.alert("❌ Error", "No se pudo canjear vidas.");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="w-full max-w-md bg-secondary-500 py-3 rounded-full mt-4 shadow-lg"
          >
            <Text className="text-center text-white font-semibold text-base">
              Canjear 5 vidas por 500 puntos
            </Text>
          </TouchableOpacity>

          <Image
            source={require("@/assets/images/condor.png")}
            className="w-28 h-28 mt-6 opacity-90"
            resizeMode="contain"
          />
        </View>
      ) : (
        <>
          <View className="flex-row justify-end space-x-4 mb-6">
            <View className="flex-row items-center gap-2 px-5 py-2 rounded-xl bg-white border border-gray-200 shadow-sm">
              <FontAwesome5 name="coins" size={18} color="#facc15" />
              <Text className="text-base font-medium text-gray-800">{points ?? "…"}</Text>
            </View>
            <View className="flex-row items-center gap-2 px-5 py-2 rounded-xl bg-white border border-gray-200 shadow-sm">
              <FontAwesome5 name="heart" size={18} color="#f87171" />
              <Text className="text-base font-medium text-gray-800">{lives ?? "…"}</Text>
            </View>
          </View>


          <Text className="text-center text-2xl font-extrabold text-primary-700 mb-4">{title}</Text>

          <View className="rounded-3xl overflow-hidden border border-background-300 shadow-lg mb-6">
            <Video
              key={videoKey}
              source={{ uri: videoUrl }}
              useNativeControls
              resizeMode="contain"
              shouldPlay
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish && !status.isLooping) handleVideoEnd();
              }}
              style={{ width: width - 40, height: (width - 40) * (9 / 16), backgroundColor: "#000" }}
            />
          </View>

          <TouchableOpacity disabled className="py-3 px-6 rounded-full bg-secondary-100 border border-secondary-300 flex-row items-center justify-center space-x-2">
            <FontAwesome5 name="play-circle" size={18} color="#007070" />
            <Text className="text-secondary-800 font-semibold text-base">Toca el video para empezar</Text>
          </TouchableOpacity>

          <Animatable.View animation="fadeInUp" delay={500} className="mt-10 px-6 py-5 rounded-2xl bg-background-200 border border-background-400">
            <Text className="text-center text-lg font-medium text-textSecondary-600 leading-7"> {phrase}</Text>
          </Animatable.View>

          <Animatable.View animation="bounceIn" delay={800} className="mt-10 items-center">
            <Image source={require("@/assets/logo/logo-main.png")} className="w-32 h-32 opacity-95" resizeMode="contain" />
          </Animatable.View>
        </>
      )}
    </View>
  );
}
