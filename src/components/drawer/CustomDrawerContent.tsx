"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
} from "react-native"
import type { DrawerContentComponentProps } from "@react-navigation/drawer"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

// Habilitar LayoutAnimation en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface MenuItem {
  id: string
  title: string
  route?: string
  icon: keyof typeof Ionicons.glyphMap
  children?: MenuItem[]
  badge?: number
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    title: "Inicio",
    route: "/(tabs)",
    icon: "home-outline",
  },
  {
    id: "2",
    title: "Productos",
    icon: "cube-outline",
    badge: 12,
    children: [
      {
        id: "2-1",
        title: "Moviemientos",
        route: "/(root)/(home)/transaction",
        icon: "phone-portrait-outline",
        badge: 5,
      },
      {
        id: "2-2",
        title: "Ropa",
        route: "/productos/ropa",
        icon: "shirt-outline",
        badge: 3,
      },
      {
        id: "2-3",
        title: "Hogar",
        route: "/productos/hogar",
        icon: "home-outline",
        badge: 4,
      },
    ],
  },
  {
    id: "3",
    title: "Servicios",
    icon: "construct-outline",
    children: [
      {
        id: "3-1",
        title: "Consultoría",
        route: "/servicios/consultoria",
        icon: "people-outline",
      },
      {
        id: "3-2",
        title: "Soporte Técnico",
        route: "/servicios/soporte",
        icon: "build-outline",
        badge: 2,
      },
      {
        id: "3-3",
        title: "Mantenimiento",
        route: "/servicios/mantenimiento",
        icon: "settings-outline",
      },
    ],
  },
  {
    id: "4",
    title: "Configuración",
    icon: "settings-outline",
    children: [
      {
        id: "4-1",
        title: "Perfil",
        route: "/configuracion/perfil",
        icon: "person-outline",
      },
      {
        id: "4-2",
        title: "Notificaciones",
        route: "/configuracion/notificaciones",
        icon: "notifications-outline",
        badge: 8,
      },
      {
        id: "4-3",
        title: "Privacidad",
        route: "/configuracion/privacidad",
        icon: "shield-outline",
      },
    ],
  },
]

interface DrawerItemProps {
  item: MenuItem
  onPress: (route?: string) => void
  isExpanded: boolean
  onToggle: () => void
  level: number
  index: number
}

const DrawerItem: React.FC<DrawerItemProps> = ({ item, onPress, isExpanded, onToggle, level, index }) => {
  const hasChildren = item.children && item.children.length > 0
  const paddingLeft = level * 16 + 16
  const rotateAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  // Animación de entrada
  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 50),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [])

  // Animación de rotación para el chevron
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [isExpanded])

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  const handlePress = () => {
    if (hasChildren) {
      // Animación suave para el layout
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      })
      onToggle()
    } else if (item.route) {
      onPress(item.route)
    }
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Pressable
        onPress={handlePress}
        className="mx-2 rounded-xl overflow-hidden"
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#F3F4F6" : "transparent",
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <View className="flex-row items-center py-4 px-4" style={{ paddingLeft }}>
          <View className="w-6 h-6 items-center justify-center">
            <Ionicons name={item.icon} size={level === 0 ? 22 : 20} color={level === 0 ? "#374151" : "#6B7280"} />
          </View>

          <Text
            className={`flex-1 ml-4 font-medium ${level === 0 ? "text-gray-800 text-base" : "text-gray-600 text-sm"}`}
          >
            {item.title}
          </Text>

          {/* Badge */}
          {item.badge && (
            <View className="bg-blue-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1.5 mr-2">
              <Text className="text-white text-xs font-bold">{item.badge > 99 ? "99+" : item.badge}</Text>
            </View>
          )}

          {/* Chevron animado */}
          {hasChildren && (
            <Animated.View
              style={{
                transform: [{ rotate: rotateInterpolate }],
              }}
            >
              <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
            </Animated.View>
          )}
        </View>
      </Pressable>

      {/* Subitems con animación */}
      {hasChildren && isExpanded && (
        <View className="ml-2 border-l-2 border-gray-100 ml-6">
          {item.children?.map((child, childIndex) => (
            <SubItem key={child.id} item={child} onPress={onPress} paddingLeft={paddingLeft + 20} index={childIndex} />
          ))}
        </View>
      )}
    </Animated.View>
  )
}

interface SubItemProps {
  item: MenuItem
  onPress: (route?: string) => void
  paddingLeft: number
  index: number
}

const SubItem: React.FC<SubItemProps> = ({ item, onPress, paddingLeft, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(-20)).current

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 80),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }],
      }}
    >
      <Pressable
        onPress={() => item.route && onPress(item.route)}
        className="mx-2 rounded-lg overflow-hidden"
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#F9FAFB" : "transparent",
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}
      >
        <View className="flex-row items-center py-3 px-4" style={{ paddingLeft }}>
          <View className="w-4 h-4 items-center justify-center">
            <Ionicons name={item.icon} size={16} color="#9CA3AF" />
          </View>

          <Text className="flex-1 ml-3 text-gray-600 text-sm">{item.title}</Text>

          {item.badge && (
            <View className="bg-orange-400 rounded-full min-w-[18px] h-4 items-center justify-center px-1">
              <Text className="text-white text-xs font-bold">{item.badge > 99 ? "99+" : item.badge}</Text>
            </View>
          )}

          <Ionicons name="chevron-forward" size={14} color="#D1D5DB" />
        </View>
      </Pressable>
    </Animated.View>
  )
}

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const router = useRouter()
  const searchFadeAnim = useRef(new Animated.Value(0)).current
  const headerSlideAnim = useRef(new Animated.Value(-50)).current

  useEffect(() => {
    // Animación de entrada del header
    Animated.parallel([
      Animated.timing(headerSlideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(searchFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const handleNavigation = (route?: string) => {
    router.push(route as any)
    props.navigation.closeDrawer()
  }

  const filterItems = (items: MenuItem[], query: string): MenuItem[] => {
    if (!query.trim()) return items

    return items.reduce((filtered: MenuItem[], item) => {
      const matchesTitle = item.title.toLowerCase().includes(query.toLowerCase())
      const filteredChildren = item.children ? filterItems(item.children, query) : []

      if (matchesTitle || filteredChildren.length > 0) {
        filtered.push({
          ...item,
          children: filteredChildren.length > 0 ? filteredChildren : item.children,
        })
      }

      return filtered
    }, [])
  }

  const filteredItems = filterItems(menuItems, searchQuery)

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header animado */}
      <Animated.View
        className="px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50"
        style={{
          transform: [{ translateY: headerSlideAnim }],
        }}
      >
        <View className="flex-row items-center mb-4">
          <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
            <Ionicons name="apps" size={20} color="white" />
          </View>
          <View>
            <Text className="text-xl font-bold text-gray-800">Mi App</Text>
            <Text className="text-sm text-gray-500">Versión 1.0</Text>
          </View>
        </View>

        {/* Search Bar animado */}
        <Animated.View
          className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
          style={{ opacity: searchFadeAnim }}
        >
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-gray-700 text-base"
            placeholder="Buscar opciones..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery("")}
              className="p-1"
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </Pressable>
          )}
        </Animated.View>
      </Animated.View>

      {/* Menu Items */}
      <ScrollView
        className="flex-1 py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <DrawerItem
              key={item.id}
              item={item}
              onPress={handleNavigation}
              isExpanded={expandedItems.has(item.id)}
              onToggle={() => toggleExpanded(item.id)}
              level={0}
              index={index}
            />
          ))
        ) : (
          <Animated.View className="px-6 py-12 items-center" style={{ opacity: searchFadeAnim }}>
            <Ionicons name="search-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-500 text-center mt-4 text-base">No se encontraron resultados</Text>
            <Text className="text-gray-400 text-center mt-1 text-sm">Intenta con otros términos de búsqueda</Text>
          </Animated.View>
        )}
      </ScrollView>

      {/* Footer mejorado */}
      <View className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <Pressable
          className="flex-row items-center py-3 px-4 rounded-xl"
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#FEE2E2" : "transparent",
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
        >
          <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center">
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          </View>
          <Text className="ml-3 text-red-500 font-medium">Cerrar Sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
