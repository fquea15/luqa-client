import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      initialRouteName={"[id]"}
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Cursos",
        }}
      />
      <Stack.Screen
        name="course/[id]"
        options={{
          title: "Lecciones",
        }}
      />
      <Stack.Screen
        name="lesson/[id]"
        options={{
          title: "Video",
        }}
      />
    </Stack>
  );
};

export default Layout;
