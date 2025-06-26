// src/shared/services/lessonService.ts
import API from "./routeService";

export type Lesson = {
  lessonId: number;
  courseId: number;
  title: string;
  videoUrl: string;
  orderInCourse: number;
  lessonType: "Standard" | "Premium";
  duration?: number;
};

export const getLessonsByCourseId = async (
  courseId: string
): Promise<Lesson[]> => {
  const response = await API.get(`/Lesson/course/${courseId}`);
  return response.data;
};

export const getLessonById = async (id: string): Promise<Lesson> => {
  const response = await API.get(`/Lesson/${id}`);
  return response.data;
};

