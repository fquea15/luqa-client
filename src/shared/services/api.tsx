// src/shared/services/api.ts
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

export default API;
