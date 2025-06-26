// src/shared/services/api.ts
/*import axios from "axios";
import Constants from "expo-constants";

const baseURL = Constants.expoConfig?.extra?.API_URL;
console.log("👉 URL base:", baseURL);

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;*/

// shared/services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - Add JWT token
    this.api.interceptors.request.use(
      async (config) => {
        try {
          let token = await AsyncStorage.getItem('authToken');
          if (!token) {
            token = process.env.EXPO_PUBLIC_API_TOKEN || ""; // Usa el token del .env si no hay en AsyncStorage
          }
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error getting auth token:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - Handle errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          await AsyncStorage.removeItem('authToken');
          // Navigate to login screen if needed
        }
        return Promise.reject(error);
      }
    );
  }

  // User data methods
  public getCurrentUserId(): string { 
    // Usa variable de entorno o valor fijo
    return process.env.EXPO_PUBLIC_USER_ID || "6";
  }

  public getCurrentUserName(): string {
    return process.env.EXPO_PUBLIC_USER_NAME || "ksksa";  
  }
  
  // Internal method to get axios instance for HTTP operations
  public getAxiosInstance(): AxiosInstance {
    return this.api;
  }
}

export const apiService = new ApiService();
export default apiService;
