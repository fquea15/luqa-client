import { Drawer } from "expo-router/drawer"
import { useColorScheme } from "nativewind"
import CustomDrawer from "@/components/drawer/CustomDrawer"

export default function DrawerLayout() {
  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === "dark"

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer onClose={() => props.navigation.closeDrawer()} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isDark ? "#121212" : "#F9FBFC",
          shadowColor: isDark ? "#000" : "#004E64",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 0,
          elevation: 3,
        },
        headerTintColor: isDark ? "#ffffff" : "#1A1A1A",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
        drawerStyle: {
          width: "70%",
          maxWidth: 320,
        },
        //drawerType: "slide",
        overlayColor: "rgba(0, 0, 0, 0.5)",
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Luqa",
          headerTitle: "Luqa",
        }}
      />
    </Drawer>
  )
}
