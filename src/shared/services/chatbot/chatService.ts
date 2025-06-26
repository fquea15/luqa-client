import axios from "axios";

const API_URL = "https://webhook-processor-luqa.up.railway.app/webhook/chat";

export const sendMessageToN8n = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data?.reply || "No se obtuvo respuesta del asistente.";
  } catch (error) {
    console.error("Error al conectar con n8n:", error);
    return "Ocurrió un error al procesar tu mensaje.";
  }
};
