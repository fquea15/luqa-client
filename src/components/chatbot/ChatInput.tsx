import clsx from "clsx";
import { ArrowUp } from "lucide-react-native";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  variant?: "floating" | "bottom"; // "floating" = bordes completos, "bottom" = pegado al fondo
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  placeholder = "Escribe lo que deseas",
  variant = "floating",
}) => {
  return (
    <View
      className={clsx(
        "flex-row items-center px-4 py-2 mx-4",
        "bg-secondary-100",
        {
          "rounded-full my-4": variant === "floating",
          "rounded-t-2xl": variant === "bottom",
        }
      )}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#5F6C7B" // textSecondary-500
        className="flex-1 pr-2 text-base text-textPrimary-800"
      />
      <TouchableOpacity
        onPress={onSend}
        className="w-10 h-10 rounded-full bg-secondary-500 items-center justify-center"
      >
        <ArrowUp color="#FFFFFF" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
