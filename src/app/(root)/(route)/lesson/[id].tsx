import LessonPlayer from "@/components/lesson/card-LessonPlayer";
import QuestionCard from "@/components/lesson/QuestionCard";
import { getLessonById, Lesson } from "@/shared/services/lessonService";
import { getQuestionsByLessonId } from "@/shared/services/questionService";
import axios from "axios";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    console.log("🆔 ID recibido:", id);

    if (id) {
      getLessonById(String(id))
        .then(setLesson)
        .catch((error) => {
          console.error("❌ Error cargando lección:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleVideoEnd = async () => {
    console.log("📺 Video finalizado. Cargando preguntas…");

    try {
      const data = await getQuestionsByLessonId(Number(id));

      // Enriquecer con respuestas (options)
      const enrichedQuestions = await Promise.all(
        data.map(async (q) => {
          const res = await axios.get(`${API_URL}/Answer/by-question/${q.questionId}`);
          return {
            ...q,
            options: res.data,
          };
        })
      );

      setQuestions(enrichedQuestions);
      setShowQuestions(true);
    } catch (error) {
      console.error("⚠️ Error cargando preguntas/respuestas:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-100">
        <ActivityIndicator size="large" color="#00A6A6" />
        <Text className="mt-3 text-textSecondary-500">Cargando lección…</Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View className="flex-1 items-center justify-center bg-background-100">
        <Text className="text-danger-500 font-semibold">Lección no encontrada</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-100">
      {!showQuestions ? (
        <LessonPlayer
          title={lesson.title}
          videoUrl={lesson.videoUrl}
          onVideoEnd={handleVideoEnd}
        />
      ) : questions.length > 0 ? (
        <QuestionCard questions={questions} lessonId={lesson.lessonId} />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-warning-500 font-semibold">
            No hay preguntas disponibles para esta lección.
          </Text>
        </View>
      )}
    </View>
  );
}
