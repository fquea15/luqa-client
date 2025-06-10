import { Community } from '@/types/community';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

const axiosWithAuth = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export const communitiesService = {
  getCommunities: async (): Promise<Community[]> => {
    const response = await axiosWithAuth.get('/Community');
    return response.data;
  },

  getCommunityById: async (id: number): Promise<Community> => {
    const response = await axiosWithAuth.get<Community>(`/Community/${id}`);
    return response.data;
  },

  createCommunity: async (communityData: {
    name: string;
    description: string;
    imageUrl: string;
  }): Promise<Community> => {
    const response = await axiosWithAuth.post('/Community', communityData);
    return response.data;
  },

  updateCommunity: async (id: number, communityData: {
    name: string;
    description: string;
    imageUrl: string;
  }): Promise<Community> => {
    const response = await axiosWithAuth.put(`/Community/${id}`, communityData);
    return response.data;
  },

  deleteCommunity: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await axiosWithAuth.delete<{ success: boolean; message: string }>(`/Community/${id}`);
    return response.data;
  },

  joinCommunity: async (communityId: number): Promise<void> => {
    await axiosWithAuth.post(`/Community/${communityId}/join`);
  },

  leaveCommunity: async (communityId: number): Promise<void> => {
    await axiosWithAuth.post(`/Community/${communityId}/leave`);
  },
};
