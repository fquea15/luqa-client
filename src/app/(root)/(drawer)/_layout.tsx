import Drawer from "expo-router/drawer";

const Layout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Inicio",
          headerShown: true,
          drawerLabel: "Inicio",
        }}
      />
    </Drawer>
  );
};

export default Layout;
