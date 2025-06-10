import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="member-profile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;