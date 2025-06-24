import LessonPlayer from "@/components/lesson/card-LessonPlayer";
import QuestionCard from "@/components/lesson/QuestionCard";
import { getLessonById, getLessonsByCourseId, Lesson } from "@/shared/services/lessonService";
import { updateLessonProgress } from "@/shared/services/progressService";
import { getQuestionsWithAnswersByLessonId } from "@/shared/services/questionService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [videoReplayKey, setVideoReplayKey] = useState(0);

  const pointsGiven = useRef(false); // 👉 Controla si ya se registró +10 pts

  useEffect(() => {
    if (id) {
      getLessonById(String(id))
        .then((lessonData) => {
          setLesson(lessonData);
          pointsGiven.current = false;
        })
        .catch((error) => console.error("❌ Error cargando lección:", error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleVideoEnd = async () => {
    if (!lesson) return;
    try {
      if (!pointsGiven.current) {
        await updateLessonProgress({
          lessonId: lesson.lessonId,
          userId: 2,
          status: "Completed",
          isCorrect: null,
          createdBy: 1,
          updatedBy: 1,
        });
        pointsGiven.current = true;
        console.log("✅ +10 puntos por ver video");
      }

      const enriched = await getQuestionsWithAnswersByLessonId(lesson.lessonId);
      console.log("📡 Obteniendo preguntas con respuestas de la lección:", lesson.lessonId);
      setQuestions(enriched);
      setShowQuestions(true);
    } catch (error) {
      console.error("⚠️ Error al finalizar video:", error);
    }
  };

  const handleReplay = async () => {
    if (!lesson) return;
    setShowQuestions(false);
    setTimeout(async () => {
      setVideoReplayKey((prev) => prev + 1);
      const enriched = await getQuestionsWithAnswersByLessonId(lesson.lessonId);
      setQuestions(enriched);
    }, 300);
  };

  const handleFinish = async () => {
    if (!lesson?.courseId || !lesson?.orderInCourse) return;
    try {
      await updateLessonProgress({
        lessonId: lesson.lessonId,
        userId: 2,
        status: "Completed",
        isCorrect: true,
        createdBy: 2,
        updatedBy: 2,
      });
      console.log("✅ Lección registrada como completada");

      const allLessons = await getLessonsByCourseId(lesson.courseId);
      const nextLesson = allLessons.find(
        (l) => l.orderInCourse === lesson.orderInCourse + 1
      );

      if (nextLesson) {
        router.replace(`/(root)/(route)/lesson/${nextLesson.lessonId}`);
      } else {
        router.replace(`/(root)/(route)/lecciones/${lesson.courseId}`);
      }
    } catch (error) {
      console.error("❌ Error al finalizar lección:", error);
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
    <View className="flex-1 bg-background-100 relative">
      <LessonPlayer
        key={videoReplayKey}
        title={lesson.title}
        videoUrl={lesson.videoUrl}
        onVideoEnd={handleVideoEnd}
      />
      {showQuestions && questions.length > 0 && (
        <View className="absolute inset-0 z-10 px-4 py-6 bg-black/40">
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
