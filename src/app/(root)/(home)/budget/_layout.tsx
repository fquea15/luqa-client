import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Presupuesto",
        }}
      />
      <Stack.Screen
        name="category/[id]"
        options={{
          title: "Presupuesto",
        }}
      />
    </Stack>
  );
};

export default Layout;
