// shared/Interfaces/chat/IChatMessage.ts
export interface IChatMessage {
  id?: number | string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
  profilePicture?: string;
}