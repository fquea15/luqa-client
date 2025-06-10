// src/app/(root)/(route)/lesson/[id].tsx
import LessonPlayer from "@/components/lesson/card-LessonPlayer";
import { getLessonById, Lesson } from "@/shared/services/lessonService";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getLessonById(String(id))
        .then(setLesson)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00A6A6" />
        <Text style={styles.loadingText}>Cargando lección…</Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Lección no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LessonPlayer title={lesson.title} videoUrl={lesson.videoUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  loadingText: { marginTop: 12, color: "#666" },
  errorText: { color: "red" },
});
