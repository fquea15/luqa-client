import CourseCard from "@/components/course/card-course";
import {
  Course,
  getCourseProgressByRoute,
  getCoursesByRouteId,
} from "@/shared/services/courseService";
import { getRoutes } from "@/shared/services/routeService";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CoursesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [completedCourses, setCompletedCourses] = useState<number[]>([]);
  const [routeTitle, setRouteTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAppStore() as UserState;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const [fetchedCourses, progress, allRoutes] = await Promise.all([
            getCoursesByRouteId(String(id)),
            getCourseProgressByRoute(String(id), userInfo?.userId!),
            getRoutes(),
          ]);

          const completed = progress.filter(p => p.isCompleted).map(p => p.courseId);

          const route = allRoutes.find(r => r.routeId === parseInt(String(id)));
          setRouteTitle(route?.title || "");

          setCourses(fetchedCourses);
          setCompletedCourses(completed);
        } catch (error) {
          console.error("❌ Error cargando cursos o ruta:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#00A6A6" />
        <Text className="mt-2 text-gray-600">Cargando cursos...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-background-100 px-5 pt-6"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="mb-6">
          <Text className="text-2xl font-extrabold text-primary-500">
            Tus cursos de {routeTitle}
          </Text>

          <Text className="mt-1 text-base text-textSecondary-500">
            Aprende a manejar tu dinero de manera inteligente
          </Text>

          <Text className="mt-1 text-base font-semibold text-textPrimary-800">
            Explora tu camino financiero
          </Text>
        </View>

        {courses.map((course, index) => {
          const isCompleted = completedCourses.includes(course.courseId);
          const isPreviousCompleted =
            index === 0 || completedCourses.includes(courses[index - 1]?.courseId);
          const status = isCompleted ? "completed" : isPreviousCompleted ? "in_progress" : "locked";

          return (
            <CourseCard
              key={course.courseId}
              index={index}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              status={status}
              onPress={() => {
                if (status !== "locked") {
                  router.push(`/(root)/(route)/course/${course.courseId}`);
                }
              }}
            />
          );
        })}
      </ScrollView>
      <SafeAreaView edges={["bottom"]} />
    </>
  );
}
