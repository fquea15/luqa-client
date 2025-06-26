// shared/services/community/communityService.ts
import { ICommunity, ICreateCommunity } from '@/shared/interfaces/community/ICommunity';
import apiClient from './communityApi';

export class CommunityService {
  private readonly baseUrl = '/community';

  // Get all communities
  async getCommunities(): Promise<ICommunity[]> {
    try {
      return await apiClient.get<ICommunity[]>(this.baseUrl);
    } catch (error) {
      console.error('Error fetching communities:', error);
      throw error;
    }
  }

  // Create new community
  async createCommunity(communityData: ICreateCommunity): Promise<ICommunity> {
    try {
      return await apiClient.post<ICommunity>(this.baseUrl, communityData);
    } catch (error) {
      console.error('Error creating community:', error);
      throw error;
    }
  }

  // Join community
  async joinCommunity(communityId: number): Promise<boolean> {
    try {
      await apiClient.post(`${this.baseUrl}/${communityId}/join`);
      return true;
    } catch (error) {
      console.error('Error joining community:', error);
      return false;
    }
  }

  // Leave community
  async leaveCommunity(communityId: number): Promise<boolean> {
    try {
      await apiClient.post(`${this.baseUrl}/${communityId}/leave`);
      return true;
    } catch (error) {
      console.error('Error leaving community:', error);
      return false;
    }
  }

  // Search communities
  async searchCommunities(searchTerm: string): Promise<ICommunity[]> {
    try {
      return await apiClient.get<ICommunity[]>(`${this.baseUrl}/search`, { term: searchTerm });
    } catch (error) {
      console.error('Error searching communities:', error);
      throw error;
    }
  }
}

export const communityService = new CommunityService();