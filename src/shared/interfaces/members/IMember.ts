// shared/Interfaces/members/IMember.ts
export interface IMember {
  id: number;
  name: string;
  role: string;
  avatarUrl?: string;
  isCurrentUser: boolean;
}
