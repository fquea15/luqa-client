// shared/Interfaces/message/IMessage.ts
export interface IMessage {
  id: number | string;
  senderId: number;
  senderName: string;
  content: string;
  timestamp: string; 
  isCurrentUser: boolean;
  profilePicture?: string;
}
