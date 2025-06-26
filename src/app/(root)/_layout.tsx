import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack initialRouteName="(drawer)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="(route)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: true }} />
    </Stack>
  );
};

export default Layout;
