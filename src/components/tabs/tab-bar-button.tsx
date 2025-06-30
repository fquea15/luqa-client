import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  LucideBot,
  LucideCircleHelp,
  LucideHome,
  LucideMap,
  LucideUsers,
} from "lucide-react-native";

const TabBarButton: any = (props: any) => {
  const { isFocused, label, routeName, color } = props;

  const scale = useSharedValue(0);

  const iconsMap: Record<string, any> = {
    home: <LucideHome color={color} size={22}/>,
    route: <LucideMap color={color} size={22}/>,
    "chat-ia": <LucideBot color={color} size={22}/>,
    community: <LucideUsers color={color} size={22}/>,
  };

  const icon = iconsMap[routeName] ?? <LucideCircleHelp color={color} size={22}/>;

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      // styles
      transform: [{ scale: scaleValue }],
      top,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      // styles
      opacity,
    };
  });
  return (
    <Pressable {...props} className={"justify-center items-center flex-1 gap-1"}>
      <Animated.View style={[animatedIconStyle]}>{icon}</Animated.View>

      <Animated.Text
        style={[
          {
            color,
            fontSize: 11,
            textTransform: "uppercase",
            textAlign: "center",
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;
