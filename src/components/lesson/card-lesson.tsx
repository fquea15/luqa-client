// src/components/lesson/card-lesson.tsx
import { Lesson } from "@/shared/services/lessonService";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
  lesson: Lesson;
};

export default function CardLesson({ lesson }: Props) {
  return (
    <Link
      href={{ pathname: "/(root)/(route)/lesson/[id]", params: { id: lesson.lessonId } }}
      asChild
    >
      <Pressable className="mb-3 p-4 bg-blue-50 rounded-xl flex-row justify-between items-center">
        <View>
          <Text className="text-base font-bold text-gray-800">{lesson.title}</Text>
          <Text className="text-sm text-gray-500 mt-1">{lesson.lessonType}</Text>
        </View>
        <Text className="text-sm text-gray-400">#{lesson.orderInCourse}</Text>
      </Pressable>
    </Link>
  );
}
