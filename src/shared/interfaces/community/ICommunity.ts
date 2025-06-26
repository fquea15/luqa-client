// shared/interfaces/community/ICommunity.ts
export interface ICommunity {
  id: number;
  name: string;
  description: string;
  membersCount: number;
  isActive: boolean;
  createdAt: string; 
  imageUrl: string;
  isJoined: boolean;
}

export interface ICreateCommunity {
  name: string;
  description: string;
  imageUrl: string;
}