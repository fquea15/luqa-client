import { Message } from '@/types/message';
import axios from 'axios';
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

const axiosWithAuth = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export const messagesService = {
  async getMessagesByCommunity(communityId: number, currentUserId: number): Promise<Message[]> {
    const { data } = await axiosWithAuth.get(`/Messages/community/${communityId}`);

    return data.map((msg: any) => ({
      id: msg.messageId,
      content: msg.content,
      userName: msg.userFullName,
      userAvatar: msg.userFullName
        ? msg.userFullName.substring(0, 2).toUpperCase()
        : 'NN',
      isMe: msg.userId === currentUserId,
      timestamp: new Date(msg.sentDate).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));
  },

  async sendMessage(communityId: number, content: string): Promise<Message> {
    const { data } = await axiosWithAuth.post(`/Messages`, {
      communityId,
      content,
    });

    return {
      id: data.messageId,
      content: data.content,
      userName: data.userFullName,
      userAvatar: data.userFullName
        ? data.userFullName.substring(0, 2).toUpperCase()
        : 'NN',
      isMe: true,
      timestamp: new Date(data.sentDate).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  },

  async deleteMessage(messageId: number): Promise<void> {
    await axiosWithAuth.delete(`/Messages/${messageId}`);
  },
};
