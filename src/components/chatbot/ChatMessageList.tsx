import React from "react";
import { View } from "react-native";
import ChatMessage from "./ChatMessage";
import { IChatIaMessage } from "@/shared/interfaces/chat-ia-interface";

export default function ChatMessageList({ messages }: { messages: IChatIaMessage[] }) {
  return (
    <View className="gap-3">
      {messages.map((msg, index) => (
        <ChatMessage key={index} text={msg.content} from={msg.type as "ia" | "human"} />
      ))}
    </View>
  );
}
