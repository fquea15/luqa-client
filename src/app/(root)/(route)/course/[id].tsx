import CardLesson from "@/components/lesson/card-lesson";
import { getCourseById } from "@/shared/services/courseService";
import { getLessonProgressByCourse, LessonProgress } from "@/shared/services/lessonProgressService";
import { getLessonsByCourseId, Lesson } from "@/shared/services/lessonService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";

export default function CourseLessonsScreen() {
  const { id } = useLocalSearchParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progressList, setProgressList] = useState<LessonProgress[]>([]);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAppStore() as UserState;

  useEffect(() => {
    if (id) {
      console.log("📡 Obteniendo lecciones y progreso para curso:", id);
      Promise.all([
        getLessonsByCourseId(String(id)),
        getLessonProgressByCourse(String(id), userInfo?.userId!),
        getCourseById(String(id)), // ✅ obtenemos el título del curso
      ])
        .then(([lessonsData, progressData, courseData]) => {
          setLessons(lessonsData);
          setProgressList(progressData);
          setCourseTitle(courseData.title); // ✅ guardamos el título
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#00A6A6" />
        <Text className="mt-2 text-gray-600">Cargando lecciones...</Text>
      </View>
    );
  }

  const isUnlocked = (lesson: Lesson): boolean => {
    const isPremiumUser = false;
    if (lesson.lessonType === "Premium" && !isPremiumUser) {
      return false;
    }
    return true;
  };

  const sortedLessons = [...lessons].sort((a, b) => {
    if (a.lessonType !== b.lessonType) {
      return a.lessonType === "Standard" ? -1 : 1;
    }
    return a.orderInCourse - b.orderInCourse;
  });

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-5 pt-6">
        <View className="mb-6 px-4">
          <Text className="text-2xl font-extrabold text-primary-500">
            {courseTitle}
          </Text>

          <Text className="text-base text-textSecondary-500 mt-1">
            Lecciones disponibles para ti
          </Text>

        </View>



        {sortedLessons.map((lesson) => {
          const completed = progressList.find(
            (p) => p.lessonId === lesson.lessonId && p.status === "Completed"
          );
          const unlocked = isUnlocked(lesson);

          return (
            <CardLesson
              key={lesson.lessonId}
              lesson={lesson}
              completed={!!completed}
              unlocked={unlocked}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
0