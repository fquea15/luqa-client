import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

// ✅ Asegúrate de incluir created_by en los parámetros de entrada
export async function updateLessonProgress(data: {
  lessonId: number;
  userId: number;
  status: "Completed" | "In Progress" | "Not Started";
  isCorrect: boolean | null;
  createdBy: number;
  updatedBy: number;
}) {
  return axios.post(`${API_URL}/LessonProgress`, {
    LessonId: data.lessonId,
    UserId: data.userId,
    Status: data.status,
    IsCorrect: data.isCorrect,
    CreatedBy: data.createdBy,
    UpdatedBy: data.updatedBy,
    IsActive: true
  });
}
