import clsx from "clsx";
import React from "react";
import { Text, View } from "react-native";
import { cn } from "@/shared/lib/utils";

interface ChatMessageProps {
  text: string;
  from: "ia" | "human";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, from }) => {
  const isUser = from === "human";
  return (
    <View
      className={cn(
        "max-w-[75%] rounded-xl px-4 py-2",
        isUser
          ? "self-end rounded-br-none bg-primary-500 mr-5"
          : "self-start rounded-bl-none bg-secondary-100 ml-5"
      )}
    >
      <Text
        className={clsx("text-base", {
          "text-white": isUser,
          "text-textPrimary-800": !isUser,
        })}
      >
        {text}
      </Text>
    </View>
  );
};

export default ChatMessage;
