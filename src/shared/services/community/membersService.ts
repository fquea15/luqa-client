// shared/services/community/membersService.ts
import { IMember } from '@/shared/interfaces/members/IMember';
import apiClient from './communityApi';

export class MembersService {
  private readonly baseUrl = '/community';

  // Get community members
  async getCommunityMembers(communityId: number): Promise<IMember[]> {
    try {
      return await apiClient.get<IMember[]>(`${this.baseUrl}/${communityId}/members`);
    } catch (error) {
      console.error('Error fetching community members:', error);
      throw error;
    }
  }

  // Search members within a community (client-side filtering for now)
  async searchMembers(communityId: number, searchTerm: string): Promise<IMember[]> {
    try {
      const allMembers = await this.getCommunityMembers(communityId);
      
      if (!searchTerm.trim()) {
        return allMembers;
      }

      return allMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching members:', error);
      throw error;
    }
  }
}

export const membersService = new MembersService();