import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="course" options={{
        title: "Cursos",
      }} />
      <Stack.Screen name="lession" options={{
        title: "Lecciones",
      }}/>
    </Stack>
  );
};

export default Layout;