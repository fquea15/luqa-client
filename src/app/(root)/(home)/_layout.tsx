import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="budget"
        options={{
          title: "Transacciones",
        }}
      />
    </Stack>
  );
};

export default Layout;
