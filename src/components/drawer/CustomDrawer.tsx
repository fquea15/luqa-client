import type React from "react";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import {
  Home,
  BookOpen,
  DollarSign,
  Users,
  User,
  LogOut,
  ChevronRight,
  Route,
  GraduationCap,
  PlayCircle,
  Wallet,
  CreditCard,
  Tag,
  MessageCircle,
  Settings, BarChart2Icon,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-gifted-charts";

interface DrawerItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  route?: string;
  children?: DrawerItem[];
  badge?: number;
}

interface CustomDrawerProps {
  onClose: () => void;
}

const drawerItems: DrawerItem[] = [
  {
    id: "home",
    title: "Inicio",
    icon: Home,
    route: "/(root)/(drawer)/(tabs)/home",
  },
  {
    id: "learning",
    title: "Aprendizaje",
    icon: BookOpen,
    badge: 3,
    children: [
      {
        id: "routes",
        title: "Rutas",
        icon: Route,
        route: "/(drawer)/(tabs)/search",
      },
      {
        id: "courses",
        title: "Cursos",
        icon: GraduationCap,
        route: "/(drawer)/(tabs)/search",
        badge: 2,
      },
      {
        id: "lessons",
        title: "Lecciones",
        icon: PlayCircle,
        route: "/(drawer)/(tabs)/search",
      },
    ],
  },
  {
    id: "finances",
    title: "Finanzas",
    icon: DollarSign,
    children: [
      {
        id: "budgets",
        title: "Presupuestos",
        icon: Wallet,
        route: "/(root)/(home)/budget",
      },
      {
        id: "transactions",
        title: "Transacciones",
        icon: CreditCard,
        route: "/(root)/(home)/transaction",
        badge: 5,
      },
      {
        id: "categories",
        title: "Categorías",
        icon: Tag,
        route: "/(root)/(home)/budget/category/2",
      },
      {
        id: "statistic",
        title: "Estadísticas",
        icon: BarChart2Icon,
        route: "/(root)/(home)/statistic",
      },
    ],
  },
  {
    id: "community",
    title: "Comunidad",
    icon: Users,
    children: [
      {
        id: "communities",
        title: "Comunidades",
        icon: Users,
        route: "/(drawer)/(tabs)/profile",
      },
      {
        id: "messages",
        title: "Mensajes",
        icon: MessageCircle,
        route: "/(drawer)/(tabs)/profile",
        badge: 12,
      },
    ],
  },
  {
    id: "profile",
    title: "Perfil",
    icon: User,
    route: "/(drawer)/(tabs)/profile",
  },
];

export default function CustomDrawer({ onClose }: CustomDrawerProps) {
  const { userInfo, setUserInfo } = useAppStore() as UserState;
  const router = useRouter();
  const pathname = usePathname();
  const { colorScheme } = useColorScheme();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [animatedValues] = useState(() =>
    drawerItems.reduce(
      (acc, item) => {
        if (item.children) {
          acc[item.id] = new Animated.Value(0);
        }
        return acc;
      },
      {} as Record<string, Animated.Value>
    )
  );

  const isDark = colorScheme === "dark";

  const toggleExpanded = (itemId: string) => {
    const isCurrentlyExpanded = expandedItems.includes(itemId);
    const animatedValue = animatedValues[itemId];

    if (isCurrentlyExpanded) {
      // Collapse animation
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start(() => {
        setExpandedItems(prev => prev.filter(id => id !== itemId));
      });
    } else {
      // Expand animation
      setExpandedItems(prev => [...prev, itemId]);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  };

  const handleNavigation = (route: string) => {
    router.push(route);
    onClose();
  };

  const handleLogout = async () => {
    setUserInfo(null);
    await AsyncStorage.removeItem("token");
    router.replace("/(auth)/sign-in");
    onClose();
  };

  const isActiveRoute = (route?: string) => {
    if (!route) return false;
    return pathname === route || pathname.startsWith(route);
  };

  const renderBadge = (badge?: number) => {
    if (!badge) return null;

    return (
      <View
        className={`ml-2 h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 ${isDark ? "bg-primary-500" : "bg-primary-500"} `}
      >
        <Text className="text-xs font-semibold text-white">{badge > 99 ? "99+" : badge}</Text>
      </View>
    );
  };

  const renderDrawerItem = (item: DrawerItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = isActiveRoute(item.route);
    const IconComponent = item.icon;

    const paddingLeft = level === 0 ? "pl-4" : "pl-8";
    const textSize = level === 0 ? "text-base" : "text-sm";
    const iconSize = level === 0 ? 22 : 18;

    const animatedHeight =
      hasChildren && animatedValues[item.id]
        ? animatedValues[item.id].interpolate({
            inputRange: [0, 1],
            outputRange: [0, (item.children?.length || 0) * 50],
          })
        : 0;

    const chevronRotation =
      hasChildren && animatedValues[item.id]
        ? animatedValues[item.id].interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "90deg"],
          })
        : "0deg";

    return (
      <View key={item.id}>
        <TouchableOpacity
          onPress={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else if (item.route) {
              handleNavigation(item.route);
            }
          }}
          className={`flex-row items-center py-3.5 gap-3 ${paddingLeft} mx-3 mb-1 rounded-xl pr-4 ${
            isActive
              ? isDark
                ? "border-l-4 border-primary-400 bg-gradient-to-r from-primary-600/30 to-primary-500/20 shadow-lg"
                : "border-l-4 border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100/50 shadow-sm"
              : "active:bg-neutral-100 dark:active:bg-neutral-800/50"
          } `}
          activeOpacity={0.8}
          style={{
            shadowColor: isActive ? (isDark ? "#004E64" : "#004E64") : "transparent",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isActive ? 0.1 : 0,
            shadowRadius: 4,
            elevation: isActive ? 2 : 0,
          }}
        >
          <IconComponent
            size={iconSize}
            color={isActive? "#004E64" : "#52606D"}
            className={`mr-3 ${isActive ? "text-primary-500" : isDark ? "text-neutral-300" : "text-neutral-600"} `}
          />
          <Text
            className={`flex-1 font-medium ${textSize} ${isActive ? "font-semibold text-primary-600" : isDark ? "text-neutral-100" : "text-neutral-800"} `}
          >
            {item.title}
          </Text>

          {renderBadge(item.badge)}

          {hasChildren && (
            <Animated.View className="ml-2" style={{ transform: [{ rotate: chevronRotation }] }}>
              <ChevronRight
                size={16}
                className={isDark ? "text-neutral-400" : "text-neutral-500"}
              />
            </Animated.View>
          )}
        </TouchableOpacity>

        {hasChildren && (
          <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
            <View className="ml-2">
              {item.children?.map(child => renderDrawerItem(child, level + 1))}
            </View>
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-background-950" : "bg-gray-100"} `}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#121212" : "#F9FBFC"}
      />

      {/* Header con gradiente */}
      <View
        className={`border-[0.1px] border-b border-background-400 px-6 py-6 ${isDark ? "bg-background-950" : "bg-background-100"} `}
        style={{
          shadowColor: isDark ? "#000" : "#004E64",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 0,
          elevation: 3,
        }}
      >
        <View className="flex-row items-center">
          <View
            className={`mr-4 h-12 w-12 items-center justify-center rounded-full ${isDark ? "bg-primary-600/20" : "bg-primary-500/10"} `}
          >
            <User size={24} color={"#004E64"} className="text-primary-500" />
          </View>
          <View className="flex-1">
            <Text
              className={`text-xl font-bold ${isDark ? "text-neutral-100" : "text-primary-500"} `}
            >
              {userInfo?.fullName!}
            </Text>
            <Text
              className={`mt-0.5 text-sm ${isDark ? "text-neutral-400" : "text-textSecondary-500"} `}
            >
              {userInfo?.email!}
            </Text>
          </View>
          <TouchableOpacity
            className={`rounded-lg p-2 ${isDark ? "bg-neutral-700/50" : "bg-background-100"} `}
            activeOpacity={0.7}
          >
            <Settings size={20} color={"#52606D"} className={isDark ? "text-neutral-300" : "text-neutral-600"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items con scroll suave */}
      <ScrollView
        className="flex-1 py-4"
        showsVerticalScrollIndicator={false}
        bounces={true}
        decelerationRate="fast"
      >
        {drawerItems.map(item => renderDrawerItem(item))}
      </ScrollView>

      {/* Footer con gradiente */}
      <View
        className={`border-[0.1px] border-t border-background-400 px-3 py-1 items-center ${isDark ? "bg-background-950" : "bg-background-100"} `}
        style={{
          shadowColor: isDark ? "#000" : "#004E64",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          className={`mx-4 mt-2 flex-row items-center rounded-lg px-4 py-3 gap-3 ${
            isDark ? "active:bg-danger-900/20" : "active:bg-danger-50"
          }`}
        >
          <LogOut
            size={22}
            color={isDark ? "#EF5350" : "#E53935"}
            className="mr-2"
          />
          <Text
            className={`text-base font-semibold ${
              isDark ? "text-danger-400" : "text-danger-500"
            }`}
          >
            Cerrar Sesión
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
