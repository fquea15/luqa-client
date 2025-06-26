import api from "./api";

const BASE = "/UserStats";

export const getUserStats = async (userId: number) => {
  const response = await api.get(`${BASE}/${userId}`);
  return response.data;
};

export const removeLife = async (userId: number) => {
  const response = await api.put(`${BASE}/${userId}/remove-life`);
  return response.data;
};

export const redeemLives = async (userId: number) => {
  const response = await api.post(`${BASE}/${userId}/redeem-lives`);
  return response.data;
};
