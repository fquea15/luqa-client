import { Stack } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChatInput from "@/components/chatbot/ChatInput";
import { useAppStore } from "@/shared/store";
import apiBase from "@/shared/services/chat-bot";
import { LegendList } from "@legendapp/list";
import ChatMessage from "@/components/chatbot/ChatMessage";

export default function ChatMessageView() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { messages, addMessage } = useAppStore();

  const handleMessageSend = async () => {
    const trimmedInput = message.trim();
    if (!trimmedInput || isLoading) return;

    const timestamp = new Date().toISOString();
    addMessage({ content: trimmedInput, type: "human", date: timestamp });
    setMessage("");
    setIsLoading(true);

    try {
      const { data, status } = await apiBase.post("/chat", { input: trimmedInput });
      if (status === 200 && data?.output) {
        addMessage({
          content: data.output,
          type: "ia",
          date: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({
        content: "Lo siento, hubo un error. Por favor intenta de nuevo.",
        type: "ia",
        date: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1" edges={["bottom"]}>
        <KeyboardAvoidingView
          className="flex-1 bg-transparent"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0} // ✅ sin headerHeight
        >
          <LegendList
            className={"px-5"}
            data={messages}
            renderItem={({ item }) => (
              <View className={"mb-5"}>
                <ChatMessage text={item.content} from={item.type === "ia" ? "ia" : "human"} />
              </View>
            )}
            keyExtractor={item => item.date ?? "unknown"}
            recycleItems
            initialScrollIndex={messages.length - 1}
            alignItemsAtEnd
            maintainScrollAtEnd
            maintainScrollAtEndThreshold={0.5}
            maintainVisibleContentPosition
          />

          <ChatInput
            value={message}
            onChangeText={setMessage}
            onSend={handleMessageSend}
            variant="floating"
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
