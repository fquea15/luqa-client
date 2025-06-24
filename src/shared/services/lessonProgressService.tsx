// src/shared/services/lessonProgressService.ts
import API from "./api";

export type LessonProgress = {
  progressId: number;
  userId: number;
  lessonId: number;
  status: string;
  isCorrect?: boolean;
  pointsEarned?: number;
  isActive?: boolean;
};

export const getLessonProgressByCourse = async (
  courseId: string,
  userId: number
): Promise<LessonProgress[]> => {
  const response = await API.get(`/LessonProgress/course/${courseId}?userId=${userId}`);
  return response.data;
};
