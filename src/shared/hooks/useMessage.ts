import { messagesService } from '@/shared/services/messageService';
import { Message } from '@/types/message';
import { useEffect, useState } from 'react';

export function useCommunityChat(communityId: number, currentUserId: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await messagesService.getMessagesByCommunity(communityId, currentUserId);
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    try {
      const newMessage = await messagesService.sendMessage(communityId, content);
      setMessages(prev => [newMessage, ...prev]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteMessage = async (messageId: number) => {
    try {
      await messagesService.deleteMessage(messageId);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [communityId]);

  return {
    messages,
    loading,
    sendMessage,
    deleteMessage,
    refreshMessages: loadMessages,
  };
}
