import { FontAwesome5 } from "@expo/vector-icons";
import { Video } from "expo-av";
import React, { useRef } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useUserStats } from "./card-UseLive";

const MOTIVATIONAL_PHRASES = [
  "Hoy puede ser el primer paso hacia tu libertad financiera. 💡",
  "Cada vez que eliges aprender en lugar de rendirte, te haces más fuerte. 💪",
  "La educación financiera es la herramienta que transforma sueños en planes. 🧠",
  "El éxito no llega de la noche a la mañana, pero tú ya comenzaste. 🌅",
  "Invertir en ti es la mejor inversión que puedes hacer. 💸",
  "Tus decisiones de hoy crean tu tranquilidad de mañana. 🌿",
  "Saber administrar el dinero es una forma de amor propio. ❤️",
  "Cada lección que completas es una victoria silenciosa. 🏁",
  "No estás solo. Muchos estamos aprendiendo a construir un mejor futuro. 🤝",
  "La disciplina hoy es libertad mañana. ⏳",
  "Tu esfuerzo de hoy será tu orgullo de mañana. 🏆",
  "Paso a paso, estás construyendo tu independencia. 👣",
  "No es magia, es constancia. ✨",
  "Gastar menos no es sacrificio, es estrategia. 📊",
  "El conocimiento es el nuevo oro. 💰",
  "Ahorrar no es dejar de vivir, es elegir cómo vivir mejor. 🧭",
  "Cada moneda que decides guardar es un acto de sabiduría. 🪙",
  "Hoy aprendes, mañana decides con poder. 💼",
  "No te compares con otros. Tu progreso es único. 🧘",
  "Ser joven y responsable con tu dinero es un superpoder. 🦸‍♂️",
  "No importa cuán lento avances, no te estás deteniendo. 🚶‍♂️",
  "Responder una pregunta bien te acerca más a tu meta. 🎯",
  "Tus finanzas reflejan tus prioridades. Haz que valga la pena. 💡",
  "Luqa va contigo en cada paso hacia tu libertad. 🐦",
  "No estás viendo un video, estás invirtiendo en ti. 📈",
  "Las finanzas también son parte del autocuidado. 💖",
  "Hoy eliges formarte, mañana nadie te engañará. 🛡️",
  "Organizar tu dinero es organizar tu vida. 📋",
  "Cada punto que sumas es una decisión correcta. ✅",
  "Fallar no es perder, es aprender. 🔁",
  "Aprender finanzas te da voz, fuerza y seguridad. 🎤",
  "Si sabes usar tu dinero, el dinero no te usará a ti. 🔓",
  "Tu futuro te dará las gracias por este momento. 🙏",
  "Tú puedes. Lo estás haciendo. No te detengas. 🚀",
  "No necesitas saber todo, solo avanzar un paso más. 🧱",
  "Cada esfuerzo que haces hoy te hará sonreír mañana. 😄",
  "Los errores no definen, enseñan. 📚",
  "Lo importante no es cuánto ganas, sino cuánto entiendes. 🧮",
  "Ya diste un paso que muchos aún no se atreven. 👏",
  "Tú decides: gastar sin rumbo o avanzar con propósito. 🎯",
];


export interface LessonPlayerProps {
  title: string;
  videoUrl: string;
  onVideoEnd?: () => void;
}

export default function LessonPlayer({ title, videoUrl, onVideoEnd }: LessonPlayerProps) {
  const { width } = Dimensions.get("window");
  const { lives, points, addPoints } = useUserStats();
  const hasEndedRef = useRef(false);
  const phrase = useRef(
    MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)]
  ).current;

  const handleVideoEnd = async () => {
    if (!hasEndedRef.current) {
      hasEndedRef.current = true;
      await addPoints(10);
      onVideoEnd?.();
    }
  };

  if (lives !== null && lives <= 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background-100 px-5">
        <Text className="text-3xl font-bold text-danger-500 text-center mb-4">😢 ¡Sin vidas!</Text>
        <Text className="text-center text-textPrimary-700 mb-4">
          Necesitas al menos una vida para continuar viendo esta lección.
        </Text>
        <Image source={require("@/assets/logo/logo-main.png")} className="w-28 h-28 mt-4" resizeMode="contain" />
      </View>
    );
  }

  return (
    <View className="flex-1 px-5 pt-6">
      <View className="flex-row justify-end space-x-3 mb-2">
        <View className="bg-success-100 px-3 py-1 rounded-full border border-success-200">
          <Text className="text-success-700 font-bold text-sm">💰 {points ?? "…"}</Text>
        </View>
        <View className="bg-danger-100 px-3 py-1 rounded-full border border-danger-200">
          <Text className="text-danger-600 font-bold text-sm">❤️ {lives ?? "…"}</Text>
        </View>
      </View>

      <Text className="text-center text-2xl font-extrabold text-primary-700 mb-4">{title}</Text>

      <View className="rounded-3xl overflow-hidden border border-background-300 shadow-lg mb-6">
        <Video
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
        <Text className="text-center text-lg font-medium text-textSecondary-600 leading-7">✨ {phrase}</Text>
      </Animatable.View>

      <Animatable.View animation="bounceIn" delay={800} className="mt-10 items-center">
        <Image source={require("@/assets/logo/logo-main.png")} className="w-32 h-32 opacity-95" resizeMode="contain" />
      </Animatable.View>
    </View>
  );
}
