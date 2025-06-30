import { Tabs } from "expo-router";
import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import TabBar from "@/components/tabs/tab-bar";

const Layout = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return (
    <Tabs
      tabBar={props => !keyboardVisible && <TabBar {...props} />}
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: keyboardVisible ? { display: "none" } : undefined,
      }}
    >
      <Tabs.Screen
        name={"home"}
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name={"route"}
        options={{
          title: "Rutas",
        }}
      />

      <Tabs.Screen
        name={"chat-ia"}
        options={{
          title: "Chat IA",
        }}
      />

      <Tabs.Screen
        name={"community"}
        options={{
          title: "Comunidades",
        }}
      />
    </Tabs>
  );
};

export default Layout;
