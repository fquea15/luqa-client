import { ChatHeader, MessageInput, MessagesList } from '@/components/community/MessageChat';
import { useCommunityChat } from '@/shared/hooks/useMessage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AUTH_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const COMMUNITY_ID = Number(id);

  const decoded: any = jwtDecode(AUTH_TOKEN!);
  const CURRENT_USER_ID = decoded.userId;

  const { messages, loading, sendMessage, refreshMessages } = useCommunityChat(COMMUNITY_ID, CURRENT_USER_ID);
  const router = useRouter();
  const handleBack = () => {
    router.back(); 
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ChatHeader
          title="Grupo de inversiones"
          subtitle="200 miembros • 12 en línea"
          onBack={handleBack} 
        />
        <MessagesList
          messages={messages}
          loading={loading}
          onRefresh={refreshMessages}
        />
        <MessageInput
          onSendMessage={sendMessage}
          placeholder="Mensaje a Grupo de inversiones"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
