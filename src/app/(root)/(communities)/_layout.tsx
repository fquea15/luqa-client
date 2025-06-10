import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(member-profile)" options={{ headerShown: false }} />
      <Stack.Screen name="(message)" options={{ headerShown: false }} />
      <Stack.Screen name="(search)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;