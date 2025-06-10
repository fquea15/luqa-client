import { Video } from "expo-av";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export interface LessonPlayerProps {
  title: string;
  videoUrl: string;
}

export default function LessonPlayer({ title, videoUrl }: LessonPlayerProps) {
  const { width } = Dimensions.get("window");
  return (
    <View style={styles.playerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Video
        source={{ uri: videoUrl }}
        useNativeControls
        resizeMode="contain"
        shouldPlay
        style={[styles.video, { width: width - 32, height: (width - 32) * (9 / 16) }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006D77",
    marginBottom: 12,
    textAlign: "center",
  },
  video: {
    borderRadius: 8,
    backgroundColor: "#000",
  },
});