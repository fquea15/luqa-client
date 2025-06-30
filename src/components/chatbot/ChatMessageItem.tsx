import { View, Text } from "react-native"

interface Message {
  id: string
  content: string
  type: "human" | "ia"
  date: string
}

interface ChatMessageItemProps {
  message: Message
  isLast: boolean
}

export default function ChatMessageItem({ message, isLast }: ChatMessageItemProps) {
  const isUser = message.type === "human"

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <View
      className={`mb-4 ${isLast ? "mb-2" : ""}`}
      style={{
        alignItems: isUser ? "flex-end" : "flex-start",
      }}
    >
      <View
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser ? "bg-blue-600 rounded-br-md" : "bg-white border border-gray-200 rounded-bl-md"
        }`}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text className={`text-base leading-5 ${isUser ? "text-white" : "text-gray-900"}`}>{message.content}</Text>

        <Text
          className={`text-xs mt-1 ${isUser ? "text-blue-100" : "text-gray-500"}`}
          style={{ alignSelf: "flex-end" }}
        >
          {formatTime(message.date)}
        </Text>
      </View>
    </View>
  )
}
