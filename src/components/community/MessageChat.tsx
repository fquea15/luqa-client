import { Message } from '@/types/message';
import { useRouter } from 'expo-router';
import { ArrowLeft, MoreVertical, Search, Send } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export function ChatHeader({ title, subtitle, onBack }: ChatHeaderProps) {
  const router = useRouter(); // ✅ Usa el router

  const goToProfile = () => {
    router.push('/(root)/(communities)/(member-profile)/[id]/member-profile'); 
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <View className="flex-row items-center flex-1">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToProfile} className="flex-1">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900" numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text className="text-sm text-gray-500">
                {subtitle}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity className="p-2 mr-1">
          <Search size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <MoreVertical size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <View className={`mb-4 ${message.isMe ? 'items-end' : 'items-start'}`}>
      {!message.isMe && (
        <View className="flex-row items-center mb-1 ml-2">
          <View className="w-6 h-6 rounded-full bg-teal-500 items-center justify-center mr-2">
            <Text className="text-xs font-bold text-white">{message.userAvatar}</Text>
          </View>
          <Text className="text-xs text-gray-600">{message.userName}</Text>
        </View>
      )}
      <View
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          message.isMe
            ? 'bg-teal-600 rounded-br-md'
            : 'bg-white rounded-bl-md shadow-sm border border-gray-100'
        }`}
      >
        <Text className={`text-base ${message.isMe ? 'text-white' : 'text-gray-900'}`}>
          {message.content}
        </Text>
      </View>
      <Text className={`text-xs text-gray-500 mt-1 ${message.isMe ? 'mr-2' : 'ml-2'}`}>
        {message.timestamp}
      </Text>
    </View>
  );
}

interface MessagesListProps {
  messages: Message[];
  loading: boolean;
  onRefresh: () => void;
}

export function MessagesList({ messages, loading, onRefresh }: MessagesListProps) {
  const flatListRef = useRef<FlatList>(null);

  const orderedMessages = [...messages].sort((a, b) => a.id - b.id);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [orderedMessages]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0D9488" />
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={orderedMessages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MessageBubble message={item} />}
      className="flex-1 px-4 bg-gray-50"
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
  placeholder?: string;
}

export function MessageInput({ onSendMessage, placeholder }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    try {
      setSending(true);
      await onSendMessage(message.trim());
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <View className="flex-row items-end px-4 py-3 bg-white border-t border-gray-200">
      <View className="flex-row items-center flex-1 bg-gray-100 rounded-full px-4 py-2 mr-3">
        <Text className="text-base text-gray-600 mr-2">+</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder || 'Escribe un mensaje...'}
          multiline
          maxLength={1000}
          className="flex-1 text-base max-h-20"
          style={{ textAlignVertical: 'center' }}
        />
      </View>
      <TouchableOpacity
        onPress={handleSend}
        disabled={!message.trim() || sending}
        className={`w-10 h-10 rounded-full items-center justify-center ${
          message.trim() && !sending ? 'bg-teal-600' : 'bg-gray-300'
        }`}
      >
        <Send size={18} color={message.trim() && !sending ? 'white' : '#9CA3AF'} />
      </TouchableOpacity>
    </View>
  );
}
