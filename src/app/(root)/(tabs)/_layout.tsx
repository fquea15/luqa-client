import { Tabs } from "expo-router";

const Layout = () => (
  <Tabs initialRouteName="home" screenOptions={{
    headerShown: false
  }}>
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
      name={"profile"}
      options={{
        title: "Perfil",

      }}
    />
  </Tabs>
);

export default Layout;