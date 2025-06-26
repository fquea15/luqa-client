import { MessageChat } from "@/components/community/messages/MessageChat";
import { IChatMessage } from "@/shared/interfaces/chat/IChatMessage";
import { IMessage } from "@/shared/interfaces/message/IMessage";
import { chatHubService } from "@/shared/services/community/chatHubService";
import { communityProfileService } from "@/shared/services/community/communityprofileService";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const ChatScreen: React.FC = () => {
  const { id, currentUserId } = useLocalSearchParams<{ id: string; currentUserId?: string }>();
  const communityId = Number(id);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const convertChatMessageToIMessage = (chatMessage: IChatMessage): IMessage => ({
    id: chatMessage.id!,
    senderId: Number(chatMessage.senderId),
    senderName: chatMessage.senderName,
    content: chatMessage.content,
    timestamp: chatMessage.timestamp,
    isCurrentUser: Number(chatMessage.senderId) === Number(currentUserId),
    profilePicture: chatMessage.profilePicture,
  });

  useEffect(() => {
    let isMounted = true;

    const loadMessagesAndConnect = async () => {
      setLoading(true);

      try {
        if (!communityId) return;

        const historicMessages = await communityProfileService.getCommunityMessages(communityId);

        const chatMessages: IMessage[] = historicMessages.map(msg => ({
          ...msg,
          isCurrentUser: Number(msg.senderId) === Number(currentUserId),
        }));

        if (isMounted) setMessages(chatMessages);

        const connected = await chatHubService.initializeConnection();
        if (!connected) return;

        await chatHubService.joinCommunityGroup(communityId.toString());

        chatHubService.onReceiveMessage((chatMessage: IChatMessage) => {
          if (isMounted) {
            const iMessage = convertChatMessageToIMessage(chatMessage);
            if (iMessage && !messages.some(m => m.id === iMessage.id)) {
              setMessages(prev => [...prev, iMessage]);
            }
          }
        }, currentUserId);

      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadMessagesAndConnect();

    return () => {
      isMounted = false;
      chatHubService.offReceiveMessage();
      if (communityId) chatHubService.leaveCommunityGroup(communityId.toString());
    };
  }, [communityId, currentUserId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const messageToSend = input.trim();
    setInput("");
    try {
      await communityProfileService.sendMessage(communityId, messageToSend);
    } catch {
      setInput(messageToSend);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <MessageChat
      messages={messages}
      message={input}
      onMessageChange={setInput}
      onSendMessage={handleSend}
      isLoading={loading}
    />
  );
};

export default ChatScreen;
