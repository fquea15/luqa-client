import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ChatInput from "@/components/chatbot/ChatInput";
import ChatOptionButton from "@/components/chatbot/ChatOptionButton";

export default function ChatIA() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    router.push("/(chatbot)/message/new");
    setInput("");
  };

  const handleOption = (option: string) => {
    router.push("/(chatbot)/message/new");
  };

  return (
    // <KeyboardAwareScrollView
    //   contentContainerStyle={{ flexDirection: "column", flex: 1 }}
    //   extraScrollHeight={20}
    //   enableOnAndroid
    // >
      <View className="flex-1 justify-between px-6 pt-10 bg-background-100">
        <View className="items-center">
          <Text className="text-xl font-semibold text-primary-500 mb-4 text-center">
            Bienvenido a tu asistente inteligente
          </Text>

          <Image
            source={require("@/assets/chatIA/bot.png")}
            className="w-36 h-36 mb-6"
            resizeMode="contain"
          />

          <View className="w-full">
            <ChatOptionButton label="¿Qué puedes hacer?" onPress={() => handleOption("intro")} />
            <ChatOptionButton label="Dame ideas para ahorrar" onPress={() => handleOption("ahorro")} />
            <ChatOptionButton label="Simula mi inversión" onPress={() => handleOption("inversion")} />
          </View>
        </View>

        <ChatInput
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          variant="floating"
        />
      </View>
    // </KeyboardAwareScrollView>
  );
}
