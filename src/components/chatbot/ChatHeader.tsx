"use client"
import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"

export default function ChatHeader() {
  const router = useRouter()

  return (
    <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
      <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
        <Text className="text-blue-600 text-lg">←</Text>
      </TouchableOpacity>

      <View className="flex-1 items-center">
        <Text className="text-lg font-semibold text-gray-900">Asistente Virtual</Text>
        <Text className="text-sm text-green-600">En línea</Text>
      </View>

      <View className="w-8" />
    </View>
  )
}
