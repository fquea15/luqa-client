// components/course/card-course.tsx
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export interface CourseCardProps {
  courseId: number;
  title: string;
  description?: string;
  imageUrl: string;
}

export default function CourseCard({ courseId, title, description, imageUrl }: CourseCardProps) {
  return (
    <Link
      href={{ pathname: "/(root)/(route)/course/[id]", params: { id: courseId.toString() } }}
      asChild
    >
      <Pressable className="flex-row items-center mb-4 bg-blue-50 rounded-xl p-3">
        <Image
          source={{ uri: imageUrl }}
          className="w-12 h-12 mr-3"
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-800 text-base">{title}</Text>
          {description && (
            <Text className="text-sm text-gray-500 mt-1">{description}</Text>
          )}
        </View>
      </Pressable>
    </Link>
  );
}
