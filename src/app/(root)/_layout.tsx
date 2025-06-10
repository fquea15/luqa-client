import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(route)" options={{ headerShown: false }} />
      
      // Ruta para la pantalla de communities footer
      <Stack.Screen name="(communities)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;