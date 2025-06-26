// shared/interfaces/community/ICommunityProfile.ts
export interface ICommunityProfile {
  id: number;
  name: string;
  description: string;
  membersCount: number;
  messagesCount: number;
  activeUsersToday: number;
  growthPercentage: string;
  adminName: string;           
  adminAvatar: string;
  isActive: boolean;
  createdAt: string;
  imageUrl: string;
}