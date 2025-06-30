import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import ChatInput from "@/components/chatbot/ChatInput";
import ChatMessageList from "@/components/chatbot/ChatMessageList";
import { sendMessageToN8n } from "@/shared/services/chatbot/chatService";
import { useAppStore } from "@/shared/store";
import { ChatIaState } from "@/shared/store/slices/chat-ia-slice";
import apiBase from "@/shared/services/chat-bot";
import ChatMessageItem from "@/components/chatbot/ChatMessageItem";
import ChatHeader from "@/components/chatbot/ChatHeader";
import ChatInputNew from "@/components/chatbot/ChatInputNew";

export default function ChatMessageView() {
  const { id } = useLocalSearchParams()
  const flatListRef = useRef<FlatList>(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { messages, addMessage } = useAppStore()

  // Auto scroll al último mensaje
  const scrollToBottom = () => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }

  // Scroll automático cuando se agregan mensajes
  useEffect(() => {
    scrollToBottom()
  }, [messages.length])

  const handleMessageSend = async () => {
    const trimmedInput = message.trim()
    if (!trimmedInput || isLoading) return

    const timestamp = new Date().toISOString()

    // Agregar mensaje del usuario
    addMessage({
      content: trimmedInput,
      type: "human",
      date: timestamp,
    })

    setMessage("")
    setIsLoading(true)

    try {
      const { data, status } = await apiBase.post("/chat", {
        input: trimmedInput,
      })

      if (status === 200 && data?.output) {
        addMessage({
          content: data.output,
          type: "ia",
          date: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Error sending message:", error)
      addMessage({
        content: "Lo siento, hubo un error. Por favor intenta de nuevo.",
        type: "ia",
        date: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderMessage = ({ item, index }: { item: any; index: number }) => (
    <ChatMessageItem message={item} isLast={index === messages.length - 1} />
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ChatHeader />

      {/* Contenedor principal con KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={{ flex: 1 }}>
          {/* Lista de mensajes */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 8,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 10,
            }}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
          />
        </View>
      </KeyboardAvoidingView>
        {/* Input de chat - siempre pegado al fondo */}
        <View className="border-t border-gray-200 bg-white px-4 pt-3">
          <ChatInput
            value={message}
            onChangeText={setMessage}
            onSend={handleMessageSend}
            placeholder="Escribe tu mensaje..."
          />
        </View>
    </SafeAreaView>
  );
}
