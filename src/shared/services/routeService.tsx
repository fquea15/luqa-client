// src/shared/services/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

const baseURL = Constants.expoConfig?.extra?.API_URL;
console.log("👉 URL base:", baseURL);

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default API;

export interface Route {
  routeId: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const getRoutes = async (): Promise<Route[]> => {
  console.log("📡 Llamando a /routes desde frontend...");
  try {
    const response = await API.get("/routes");
    console.log("✅ Respuesta de la API /routes:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener rutas:", error);
    return [];
  }
};
