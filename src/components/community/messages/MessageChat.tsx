import { IMessage } from '@/shared/interfaces/message/IMessage';
import React from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

interface MessageChatProps {
  messages: IMessage[];
  message: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  isLoading?: boolean;
}

interface MessageItemProps {
  message: IMessage;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const formatTime = (timestamp: string) => {
  const utcString = timestamp.endsWith("Z") ? timestamp : `${timestamp}Z`;
  const date = new Date(utcString);
  return date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

  if (!message.isCurrentUser) {
    return (
      <View style={styles.otherUserRow}>
        <Image
          source={{ uri: message.profilePicture || 'https://ui-avatars.com/api/?name=?' }}
          style={styles.avatar}
        />
        <View style={styles.otherUserBubble}>
          <Text style={styles.senderName}>{message.senderName}</Text>
          <Text style={styles.messageText}>{message.content}</Text>
          <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.myMessageBubble}>
      <Text style={styles.messageText}>{message.content}</Text>
      <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
    </View>
  );
};

export const MessageChat: React.FC<MessageChatProps> = ({
  messages,
  message,
  onMessageChange,
  onSendMessage,
  isLoading = false
}) => {
  const renderMessage = ({ item }: { item: IMessage }) => (
    <MessageItem message={item} />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={[...messages].reverse()}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        inverted
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={onMessageChange}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#9AAAB8"
            multiline
            maxLength={500}
            editable={!isLoading}
          />
        </View>
        <Pressable
          style={[
            styles.sendButton,
            (!message.trim() || isLoading) && styles.disabledButton
          ]}
          onPress={onSendMessage}
          disabled={!message.trim() || isLoading}
        >
          <Text style={[
            styles.sendText,
            (!message.trim() || isLoading) && styles.disabledText
          ]}>
            {isLoading ? '...' : '➤'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  messagesList: { padding: 12, paddingBottom: 0 },

  otherUserRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  otherUserBubble: {
    maxWidth: '75%',
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#fff',
    elevation: 1,
  },
  myMessageBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#7df0e4',
    borderRadius: 12,
    padding: 8,
    marginVertical: 8,
    maxWidth: '75%',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 6,
    backgroundColor: '#eee',
  },
  senderName: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 2,
    color: '#004E64',
  },
  messageText: {
    fontSize: 15,
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  inputWrapper: {
    flex: 1,
    marginRight: 8,
  },
  textInput: {
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 15,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: '#004E64',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledText: {
    color: '#888',
  },
});
