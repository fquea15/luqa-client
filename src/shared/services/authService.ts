import axios from "axios";
import { IAuthResponse, IAuthValidationResponse, IUser } from "@/shared/interfaces/user-interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
export async function registerUser(payload: RegisterPayload): Promise<IUser | null> {
  const response = await axios.post(`${API_URL}/auth/sign-up`, payload);

  if (response.data && response.status === 200) {
    return response.data;
  }
  return null;
}

// POST /api/auth/login
export async function loginUser(payload: LoginPayload): Promise<IAuthResponse | null> {
  const response = await axios.post(`${API_URL}/auth/sign-in`, payload);

  if (response.data && response.status === 200) {
    return response.data;
  }
  return null;
}

export const checkUser = async (): Promise<IAuthValidationResponse | null> => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data && response.status === 200) {
    return response.data;
  }
  return null;
};
