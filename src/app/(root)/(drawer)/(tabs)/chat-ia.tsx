import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ChatInput from "@/components/chatbot/ChatInput";
import ChatOptionButton from "@/components/chatbot/ChatOptionButton";
import { useAppStore } from "@/shared/store";
import { ChatIaState } from "@/shared/store/slices/chat-ia-slice";
import apiBase from "@/shared/services/chat-bot";

export default function ChatIA() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const { addMessage } = useAppStore() as ChatIaState;

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!input.trim()) return;

    const timestamp = new Date().toString();

    addMessage({
      content: trimmedInput,
      type: "human",
      date: timestamp,
    });

    try {
      const { data, status } = await apiBase.post("/chat", { input: trimmedInput });

      if (status === 200 && data?.output) {
        addMessage({
          content: data.output,
          type: "ia",
          date: new Date().toString(),
        });

        router.push({
          pathname: "/(root)/chat-bot",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Aquí podrías agregar una notificación al usuario si deseas
    } finally {
      setInput("");
    }
  };

  const handleOption = async (option: string) => {
    const timestamp = new Date().toString();

    addMessage({
      content: option,
      type: "human",
      date: timestamp,
    });

    try {
      const { data, status } = await apiBase.post("/chat", { input: option });

      if (status === 200 && data?.output) {
        addMessage({
          content: data.output,
          type: "ia",
          date: new Date().toString(),
        });

        router.push({
          pathname: "/(root)/chat-bot",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setInput("");
    }
  };

  return (
    // <KeyboardAwareScrollView
    //   contentContainerStyle={{ flexDirection: "column", flex: 1 }}
    //   extraScrollHeight={20}
    //   enableOnAndroid
    // >
    <View className="flex-1 justify-between bg-background-100 px-6 pt-10">
      <View className="items-center">
        <Text className="mb-4 text-center text-xl font-semibold text-primary-500">
          Bienvenido a tu asistente inteligente
        </Text>

        <Image
          source={require("@/assets/chatIA/bot.png")}
          className="mb-6 h-36 w-36"
          resizeMode="contain"
        />

        <View className="w-full">
          <ChatOptionButton label="¿Qué puedes hacer?" onPress={() => handleOption("intro")} />
          <ChatOptionButton
            label="Dame ideas para ahorrar"
            onPress={() => handleOption("ahorro")}
          />
          <ChatOptionButton label="Simula mi inversión" onPress={() => handleOption("inversion")} />
        </View>
      </View>

      <ChatInput value={input} onChangeText={setInput} onSend={handleSend} variant="floating" />
    </View>
    // </KeyboardAwareScrollView>
  );
}
