import clsx from "clsx";
import React from "react";
import { Text, View } from "react-native";

interface ChatMessageProps {
  text: string;
  from: "user" | "bot";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, from }) => {
  const isUser = from === "user";

  return (
    <View
      className={clsx("px-4 py-2 my-1 mx-3 max-w-[75%] rounded-xl", {
        "bg-primary-500 self-end rounded-br-none": isUser,
        "bg-secondary-100 self-start rounded-bl-none": !isUser,
      })}
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
