// shared/services/community/communityprofileService.ts
import { ICommunityProfile } from '@/shared/interfaces/community/ICommunityProfile';
import { IMessage } from '@/shared/interfaces/message/IMessage';
import apiClient from './communityApi';

export class CommunityProfileService {
  private readonly baseUrl = '/community';

  // Get community profile
  async getCommunityProfile(communityId: number): Promise<ICommunityProfile | null> {
  try {
    const response = await apiClient.get<ICommunityProfile>(`${this.baseUrl}/${communityId}`);
    return response;
  } catch (error: any) {
    console.error('Error fetching community profile:', error);
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

  // Get community messages
  async getCommunityMessages(communityId: number): Promise<IMessage[]> {
    try {
      return await apiClient.get<IMessage[]>(`${this.baseUrl}/${communityId}/messages`);
    } catch (error) {
      console.error('Error fetching community messages:', error);
      throw error;
    }
  }

  // Send message to community
  async sendMessage(communityId: number, content: string): Promise<IMessage> {
    try {
      return await apiClient.post<IMessage>(`${this.baseUrl}/${communityId}/messages`, {
        content
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

export const communityProfileService = new CommunityProfileService();