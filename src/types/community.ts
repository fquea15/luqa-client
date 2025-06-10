export interface Community {
    communityId: number;
    createdBy: number;
    creationDate: string;
    isActive: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    updatedBy: number;
    name: string;
    description: string;
    imageUrl: string;
    members?: number;
    isJoined?: boolean;
    lastActivity?: string;
  }
  