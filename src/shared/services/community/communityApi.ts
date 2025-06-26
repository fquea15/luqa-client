// ruta: src/shared/services/community/communityApi.ts

import apiService from '@/shared/services/api';
import { AxiosInstance } from 'axios';

export class ApiClient {
  
  /*// User data methods
  public getCurrentUserId(): string { 
    // Usa variable de entorno o valor fijo
    return process.env.EXPO_PUBLIC_USER_ID || "6";
  }

  public getCurrentUserName(): string {
    return process.env.EXPO_PUBLIC_USER_NAME || "ksksa";  
  }*/

  // Generic HTTP methods lo esta usando los SERVICES
  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await apiService.getAxiosInstance().get<T>(url, { params });
    return response.data;
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await apiService.getAxiosInstance().post<T>(url, data);
    return response.data;
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await apiService.getAxiosInstance().put<T>(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await apiService.getAxiosInstance().delete<T>(url);
    return response.data;
  }

  // Get axios instance for custom HTTP requests
  public getAxiosInstance(): AxiosInstance {
    return apiService.getAxiosInstance();
  }
}

export const apiClient = new ApiClient();
export default apiClient;