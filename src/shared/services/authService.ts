import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string; // opcional
}

export interface LoginPayload {
  email: string;
  password: string;
}

// POST /api/auth/register
export async function registerUser(payload: RegisterPayload): Promise<boolean> {
  const response = await axios.post(`${API_URL}/auth/register`, payload);
  return response.data;
}

// POST /api/auth/login
export async function loginUser(payload: LoginPayload): Promise<string> {
  const response = await axios.post(`${API_URL}/auth/login`, payload);
  return response.data.token; // token
}
