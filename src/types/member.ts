export interface Member {
    memberId: number;
    userId: number;
    communityId?: number;  // Está presente en algunos DTO
    userFullName: string;
    communityName?: string; // Solo aparece en algunos casos
    role: string;
    joinDate?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    avatarUrl?: string;
  }
  