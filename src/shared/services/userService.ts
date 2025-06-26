// src/shared/services/userService.ts
import API from "./api";

export const getUserInfo = async () => {
  const res = await API.get("/users/validate");
  return res.data.user; 
};
