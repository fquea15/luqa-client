import { Lesson } from "@/shared/services/lessonService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  lesson: Lesson;
  completed?: boolean;
  unlocked?: boolean;
};

export default function CardLesson({ lesson, completed, unlocked }: Props) {
  const isPremium = lesson.lessonType === "Premium";

  const status = completed
    ? { text: "Completado", icon: "checkmark-circle", color: "#10B981" }
    : unlocked
    ? { text: "Disponible", icon: "play-circle", color: "#0EA5E9" }
    : { text: "Bloqueado", icon: "lock-closed", color: "#9CA3AF" };

  const type = isPremium
    ? { text: "Premium", icon: "diamond", color: "#F59E0B" }
    : { text: "Standard", icon: "star", color: "#6376F1" };

  const disabledStyle = unlocked ? "" : "opacity-60";

  return (
    <Link
      href={{ pathname: "/(root)/(route)/lesson/[id]", params: { id: lesson.lessonId } }}
      asChild
    >
      <Pressable
        disabled={!unlocked}
        className={`mx-4 mb-5 rounded-2xl bg-white p-4 shadow-md flex-row items-center ${disabledStyle}`}
      >
        {/* Icono */}
        <View className="w-12 h-12 rounded-xl bg-primary-100 items-center justify-center mr-4">
          <Image
            source={require("@/assets/logo/logo-main.png")}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>

        {/* Texto */}
        <View className="flex-1">
          <Text className="text-base font-semibold text-textPrimary-900 mb-1">
            {lesson.title}
          </Text>

          <View className="flex-row items-center space-x-2">
            <MaterialIcons name={type.icon as any} size={16} color={type.color} />
            <Text className="text-sm text-textSecondary-500">{type.text}</Text>
            <Text className="text-sm text-textSecondary-500">• {status.text}</Text>
          </View>
        </View>

        {/* Estado (check o candado) */}
        <Ionicons name={status.icon as any} size={20} color={status.color} />
      </Pressable>
    </Link>
  );
}
