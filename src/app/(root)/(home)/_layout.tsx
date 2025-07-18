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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="transaction"
        options={{
          title: "Movimientos",
        }}
      />
      <Stack.Screen
        name="statistic"
        options={{
          title: "Estadistica",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
