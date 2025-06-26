import API from "./routeService";

export interface Course {
  courseId: number;
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}

export interface CourseProgress {
  courseId: number;
  isCompleted: boolean;
}

export const getCoursesByRouteId = async (
  routeId: string | number
): Promise<Course[]> => {
  const response = await API.get(`/RouteCourses/byRoute/${routeId}/courses`);
  return response.data;
};

export const getCourseProgressByRoute = async (
  routeId: string | number,
  userId: number
): Promise<CourseProgress[]> => {
  const response = await API.get(`/CourseProgress/route/${routeId}?userId=${userId}`);
  return response.data;
};

// ✅ NUEVA FUNCIÓN: Obtener curso por ID
export const getCourseById = async (
  id: string | number
): Promise<Course> => {
  const response = await API.get(`/courses/${id}`);
  return response.data;
};

