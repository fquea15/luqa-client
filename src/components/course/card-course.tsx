// ✅ components/course/card-course.tsx (ACTUALIZADO PARA BLOQUEAR CURSOS)
import { CheckCircle, Lock } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

interface CourseCardProps {
  index: number;
  title: string;
  description: string;
  imageUrl: string;
  status: "completed" | "in_progress" | "locked";
  onPress: () => void;
}

export default function CourseCard({ index, title, description, imageUrl, status, onPress }: CourseCardProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";

  return (
    <View className="relative mb-5">
      <View className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 z-0" />

      <View className="flex-row items-center z-10">
        <View className="w-8 h-8 rounded-full justify-center items-center bg-white border border-gray-300">
          {isCompleted ? (
            <CheckCircle size={20} color="#4CAF50" />
          ) : isInProgress ? (
            <Text className="text-primary-700 font-bold">{index + 1}</Text>
          ) : (
            <Lock size={18} color="#ccc" />
          )}
        </View>

        <Pressable
          disabled={isLocked}
          onPress={onPress}
          className={`flex-1 ml-4 p-4 rounded-2xl shadow-md flex-row justify-between items-center ${
            isLocked ? "bg-gray-100" : "bg-white"
          }`}
        >
          <View className="flex-1 mr-4">
            <Text className="font-semibold text-base text-textPrimary-800 mb-1">{title}</Text>
            <Text className="text-sm text-gray-500 mb-1">{description}</Text>
              {isCompleted ? (
                <Text className="text-xs text-success-500">Completado</Text>
              ) : isInProgress ? (
                <Text className="text-xs text-secondary-500">En curso</Text>
              ) : null}
          </View>

          <Image
            source={{ uri: imageUrl }}
            className="w-10 h-10"
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}
