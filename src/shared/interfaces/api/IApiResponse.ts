// shared/Interfaces/api/IApiResponse.ts
export interface IApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}