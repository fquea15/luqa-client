import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import ChatInput from "@/components/chatbot/ChatInput";
import ChatMessageList from "@/components/chatbot/ChatMessageList";
import { sendMessageToN8n } from "@/shared/services/chatbot/chatService";
import {
    getMessages,
    saveMessage,
    StoredMessage,
} from "@/shared/services/chatbot/storage";

export default function ChatMessageView() {
  const { id } = useLocalSearchParams();
  const scrollRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<StoredMessage[]>([]);

  useEffect(() => {
    (async () => {
      const saved = await getMessages();
      setMessages(saved);
    })();
  }, []);

  const handleMessageSend = async () => {
    if (!message.trim()) return;

    const userMsg: StoredMessage = {
      id: Date.now().toString(),
      text: message,
      from: "user",
    };

    const newMessages = [userMsg, ...messages];
    setMessages(newMessages);
    await saveMessage(userMsg);
    setMessage("");

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);

    const replyText = await sendMessageToN8n(message);
    const botMsg: StoredMessage = {
      id: Date.now().toString() + "-bot",
      text: replyText,
      from: "bot",
    };

    const updatedMessages = [botMsg, ...newMessages];
    setMessages(updatedMessages);
    await saveMessage(botMsg);

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-100">

        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 10 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          <ChatMessageList messages={messages} />
        </ScrollView>

        <View className="px-4 pb-4">
          <ChatInput
            value={message}
            onChangeText={setMessage}
            onSend={handleMessageSend}
            variant="bottom"
          />
        </View>
    </SafeAreaView>
  );
}
