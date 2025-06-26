import LessonPlayer from "@/components/lesson/card-LessonPlayer";
import QuestionCard from "@/components/lesson/QuestionCard";
import API from "@/shared/services/routeService";
import { getLessonById, getLessonsByCourseId, Lesson } from "@/shared/services/lessonService";
import { getQuestionsWithAnswersByLessonId } from "@/shared/services/questionService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userInfo } = useAppStore() as UserState;

  const userId = userInfo?.userId!;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [videoReplayKey, setVideoReplayKey] = useState(0);

  const pointsGiven = useRef(false);

  useEffect(() => {
    if (id) {
      getLessonById(String(id))
        .then(setLesson)
        .catch(error => console.error("❌ Error al cargar la lección:", error?.message || error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleVideoEnd = async () => {
    if (!lesson || pointsGiven.current) return;
    pointsGiven.current = true;

    try {
      const enriched = await getQuestionsWithAnswersByLessonId(lesson.lessonId);
      setQuestions(enriched);
      setShowQuestions(true);

      const payload = {
        lessonId: lesson.lessonId,
        userId,
        status: "Completed",
        isCorrect: null,
        createdBy: userId,
        updatedBy: userId,
      };
      await API.post("/LessonProgress", payload);
    } catch (error: any) {
      console.error("⚠️ Error al registrar visualización:", error?.response?.data || error.message);
    }
  };

  const handleReplay = () => {
    setShowQuestions(false);
    setVideoReplayKey(prev => prev + 1);
    pointsGiven.current = false;
  };

  const handleFinish = async (answeredCorrectly: boolean): Promise<void> => {
    if (!lesson) return;

    const payload = {
      lessonId: lesson.lessonId,
      userId,
      status: "Completed",
      isCorrect: answeredCorrectly,
      createdBy: userId,
      updatedBy: userId,
    };

    try {
      await API.post("/LessonProgress", payload);

      const allLessons = await getLessonsByCourseId(String(lesson.courseId));
      const completedLessons = await Promise.all(
        allLessons.map(async l => {
          try {
            const res = await API.get(`/LessonProgress/user/${userId}/lesson/${l.lessonId}`);
            return res.data?.isCorrect === true;
          } catch {
            return false;
          }
        })
      );

      const nextLesson = allLessons.find(l => l.orderInCourse === lesson.orderInCourse + 1);

      setTimeout(() => {
        if (nextLesson) {
          router.replace(`/(root)/(route)/lesson/${nextLesson.lessonId}`);
        } else {
          router.replace(`/(root)/(route)/lecciones/${lesson.courseId}`);
        }
      }, 100); // ✅ esto evita el error de navegación
    } catch (err: any) {
      console.error("❌ Error al finalizar la lección:", err?.message || "Error desconocido");
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
        <Text className="font-semibold text-danger-500">Lección no encontrada</Text>
      </View>
    );
  }

  return (
    <View className="relative flex-1 bg-background-100">
      <LessonPlayer
        key={videoReplayKey}
        title={lesson.title}
        videoUrl={lesson.videoUrl}
        onVideoEnd={handleVideoEnd}
      />
      {showQuestions && questions.length > 0 && (
        <View className="absolute inset-0 z-10 bg-black/40 px-4 py-6">
          <QuestionCard
            questions={questions}
            lessonId={lesson.lessonId}
            onFinish={handleFinish}
            onReplay={handleReplay}
          />
        </View>
      )}
    </View>
  );
}
