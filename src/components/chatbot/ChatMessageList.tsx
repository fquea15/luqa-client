import React from "react";
import { View } from "react-native";
import ChatMessage from "./ChatMessage";

interface Props {
  messages: {
    id: string;
    text: string;
    from: "user" | "bot";
  }[];
}

export default function ChatMessageList({ messages }: Props) {
  return (
    <View className="gap-2 px-2 pb-4">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} text={msg.text} from={msg.from} />
      ))}
    </View>
  );
}
