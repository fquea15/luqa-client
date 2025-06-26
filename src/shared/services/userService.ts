// src/shared/services/userService.ts
import API from "./routeService"; // Import your API client or axios instance

export const getUserInfo = async () => {
  const res = await API.get("/users/validate");
  return res.data.user; 
};
