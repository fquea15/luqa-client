import { Member } from '@/types/member';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const mapMemberData = (item: any): Member => ({
  memberId: item.memberId,
  userId: item.userId,
  userFullName: item.userFullName,
  role: item.role,
  joinDate: item.joinDate,
  isActive: item.isActive ?? true,
  avatarUrl: item.avatarUrl || '',
  communityId: item.communityId,
  communityName: item.communityName,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

export const memberService = {
  async getMembersByCommunityId(communityId: number): Promise<Member[]> {
    const { data } = await api.get(`/Members/community/${communityId}`);
    return data.map(mapMemberData);
  },

  async getMemberById(memberId: number): Promise<Member> {
    const { data } = await api.get(`/Members/${memberId}`);
    return mapMemberData(data);
  },

  async joinCommunity(userId: number, communityId: number, role: string = 'Member'): Promise<void> {
    await api.post('/Members/join', {
      userId,
      communityId,
      role,
    });
  },

  async updateMember(memberId: number, role: string = 'Member', isActive?: boolean): Promise<void> {
    await api.put(`/Members/${memberId}`, {
      memberId,
      role,
      isActive,
    });
  },

  async leaveCommunity(memberId: number): Promise<void> {
    await api.delete(`/Members/${memberId}/leave`);
  },
};