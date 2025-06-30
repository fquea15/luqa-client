import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function ChatInputNew({
  value,
  onChangeText,
  onSend,
  isLoading = false,
  placeholder = "Escribe un mensaje...",
}: ChatInputProps) {
  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <View className="flex-row items-end space-x-3">
      {/* Input de texto */}
      <View className="max-h-[120px] min-h-[44px] flex-1 rounded-2xl bg-gray-100 px-4 py-3">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="center"
          className="text-base leading-5 text-gray-900"
          style={{
            minHeight: 20,
            maxHeight: 80,
          }}
          onSubmitEditing={canSend ? onSend : undefined}
          blurOnSubmit={false}
        />
      </View>

      {/* Botón de enviar */}
      <TouchableOpacity
        onPress={onSend}
        disabled={!canSend}
        className={`h-11 w-11 items-center justify-center rounded-full ${canSend ? "bg-blue-600" : "bg-gray-300"}`}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-lg font-semibold text-white">→</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
