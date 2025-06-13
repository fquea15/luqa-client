import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const getQuestionsByLessonId = async (lessonId: number) => {
  console.log("📡 Llamando a:", `${API_URL}/Questions/by-lesson/${lessonId}`);
  const response = await axios.get(`${API_URL}/Questions/by-lesson/${lessonId}`);
  return response.data;
};
