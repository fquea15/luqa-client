import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ChatOptionButtonProps {
  label: string;
  onPress: () => void;
}

const ChatOptionButton: React.FC<ChatOptionButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="border border-secondary-500 rounded-full py-2 px-4 mb-3"
      activeOpacity={0.8}
    >
      <Text className="text-secondary-500 text-base text-center">{label}</Text>
    </TouchableOpacity>
  );
};

export default ChatOptionButton;
