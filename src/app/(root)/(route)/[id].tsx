import CourseCard from "@/components/course/card-course";
import { Course, getCoursesByRouteId } from "@/shared/services/courseService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function CoursesScreen() {
  const { id } = useLocalSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      console.log("📡 Obteniendo cursos para ruta:", id);
      getCoursesByRouteId(String(id))
        .then(setCourses)
        .finally(() => setLoading(false));
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
    <ScrollView className="flex-1 bg-white px-5 pt-6">
      <Text className="mb-4 text-2xl font-bold text-primary-500">Cursos de la ruta {id}</Text>

      {courses.map(course => (
        <CourseCard
          key={course.courseId}
          courseId={course.courseId}
          title={course.title}
          description={course.description}
          imageUrl={course.imageUrl}
        />
      ))}
    </ScrollView>
  );
}
