import CourseCard from "@/components/course/card-course";
import { Course, getCoursesByRouteId } from "@/shared/services/courseService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CoursesScreen() {
  const { id } = useLocalSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      console.log("📡 Obteniendo cursos para ruta:", id);
      getCoursesByRouteId(String(id)).then(setCourses).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#00A6A6" />
        <Text className="mt-2 text-gray-600">Cargando cursos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-6">
        <Text className="text-2xl font-bold text-primary-500 mb-4">
          Cursos de la ruta {id}
        </Text>

        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            courseId={course.courseId}
            title={course.title}
            description={course.description}
            imageUrl={course.imageUrl}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
