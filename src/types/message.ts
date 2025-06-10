export interface Message{
  id: number;
  content: string;
  userName: string | null;
  userAvatar: string;
  isMe: boolean;
  timestamp: string;
}
