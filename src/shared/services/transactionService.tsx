
import { appendBaseUrl } from "expo-router/build/fork/getPathFromState-forks"
import API from "./api";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BaselineIcon } from "lucide-react-native"

export interface Course {
  courseId: number;
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}

export const getCoursesByRouteId = async (routeId: string | number): Promise<Course[]> => {
try {
    const response = await API.get(`/RouteCourses/byRoute/${routeId}/courses`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener cursos por ruta:", error);
    return [];
  }
};

