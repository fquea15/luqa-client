import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const getQuestionsWithAnswersByLessonId = async (lessonId: number) => {
  console.log("📡 Obteniendo preguntas con respuestas de la lección:", lessonId);
  const questionsRes = await axios.get(`${API_URL}/Questions/by-lesson/${lessonId}`);
  const questions = questionsRes.data;

  const enriched = await Promise.all(
    questions.map(async (q: any) => {
      try {
        const res = await axios.get(`${API_URL}/Answer/by-question/${q.questionId}`);
        return {
          ...q,
          options: res.data,
        };
      } catch (error) {
        console.error(`❌ Error al obtener respuestas de la pregunta ${q.questionId}:`, error);
        return { ...q, options: [] };
      }
    })
  );

  return enriched;
};
