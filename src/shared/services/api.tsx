import axios from "axios";
import Constants from "expo-constants";

const API = axios.create({
  baseURL: Constants.expoConfig?.extra?.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
