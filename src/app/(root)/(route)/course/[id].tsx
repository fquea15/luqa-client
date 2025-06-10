import CardLesson from "@/components/lesson/card-lesson"; // ⬅️ IMPORTANTE
import { getLessonsByCourseId, Lesson } from "@/shared/services/lessonService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CourseLessonsScreen() {
  const { id } = useLocalSearchParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      console.log("📡 Obteniendo lecciones para el curso:", id);
      getLessonsByCourseId(String(id))
        .then(setLessons)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#00A6A6" />
        <Text className="mt-2 text-gray-600">Cargando lecciones...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-5 pt-6">
        <Text className="text-2xl font-bold text-primary-500 mb-4">
          Lecciones del curso {id}
        </Text>

        {lessons.map((lesson) => (
          <CardLesson key={lesson.lessonId} lesson={lesson} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
