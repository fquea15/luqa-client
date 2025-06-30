"use client";

import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";

const userData = {
  user_id: 1,
  full_name: "María González",
  email: "maria.gonzalez@email.com",
  profile_picture: "https://wallpapercave.com/wp/wp5501739.jpg",
  role: "User",
  registration_date: "2024-01-15",
  last_accessed: "2024-12-30",
  is_active: true,
};

const userStats = {
  total_points: 2450,
  lives: 4,
  last_life_recharge: "2024-12-30T08:30:00",
};

const profileStats = {
  completedCourses: 8,
  totalLessons: 45,
  completedLessons: 32,
  communitiesJoined: 3,
  favoriteCourses: 12,
};

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const { userInfo, userBalance } = useAppStore() as UserState;

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar Sesión",
        style: "destructive",
        onPress: () => {
          // Lógica de logout
          console.log("Logout");
        },
      },
    ]);
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    color = "primary",
  }: {
    title: string;
    value: string;
    subtitle: string;
    icon: unknown;
    color: string;
  }) => (
    <View className="mx-1 flex-1 rounded-2xl bg-background-100 p-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Ionicons name={icon as any} size={24} className={`text-${color}-500`} />
        <Text className="text-xs font-medium text-textSecondary-500">{title}</Text>
      </View>
      <Text className="mb-1 text-2xl font-bold text-textPrimary-800">{value}</Text>
      {subtitle && <Text className="text-xs text-textSecondary-500">{subtitle}</Text>}
    </View>
  );

  const MenuOption = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightComponent,
  }: {
    icon: any;
    title: string;
    subtitle: string;
    onPress: () => void;
    showArrow?: boolean;
    rightComponent?: any;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="mb-3 flex-row items-center rounded-xl bg-background-100 p-4"
    >
      <View className="mr-4 rounded-full bg-primary-50 p-3">
        <Ionicons name={icon} size={20} className="text-primary-500" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-textPrimary-800">{title}</Text>
        {subtitle && <Text className="mt-1 text-sm text-textSecondary-500">{subtitle}</Text>}
      </View>
      {rightComponent ||
        (showArrow && (
          <Ionicons name="chevron-forward" size={20} className="text-textSecondary-400" />
        ))}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pb-6 pt-4">
          {/*<View className="mb-6 flex-row items-center justify-between">*/}
          {/*  <Text className="text-2xl font-bold text-textPrimary-800">Mi Perfil</Text>*/}
          {/*  <TouchableOpacity*/}
          {/*    onPress={handleEditProfile}*/}
          {/*    className="rounded-full bg-primary-500 p-2"*/}
          {/*  >*/}
          {/*    <Ionicons name="create-outline" size={20} color="white" />*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}

          {/* Profile Info */}
          <View className="mb-6 rounded-2xl bg-background-100 p-6">
            <View className="mb-4 flex-row items-center">
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/R.e8be15265742b4e9db4604fa6aa4b365?rik=wxglZbFwRedf5g&riu=http%3a%2f%2fhdqwalls.com%2fdownload%2fvery-cute-anime-girl-hd-3840x2160.jpg&ehk=uX69QCA1xP%2fZzQs4Jv%2boOQSFWkC7NWbBz60wV3AB0bM%3d&risl=&pid=ImgRaw&r=0",
                }}
                className="mr-4 h-20 w-20 rounded-full"
              />
              <View className="flex-1">
                <Text className="mb-1 text-xl font-bold text-textPrimary-800">
                  {userInfo?.fullName}
                </Text>
                <Text className="mb-2 text-sm text-textSecondary-500">{userInfo?.email}</Text>
                <View className="self-start rounded-full bg-success-50 px-3 py-1">
                  <Text className="text-xs font-medium text-success-600">Usuario Activo</Text>
                </View>
              </View>
            </View>

            {/* Gamification Stats */}
            <View className="flex-row rounded-xl bg-primary-50 p-4">
              <View className="flex-1 items-center">
                <View className="mb-1 flex-row items-center">
                  <Ionicons name="trophy" size={16} className="mr-1 text-warning-500" />
                  <Text className="text-lg font-bold text-textPrimary-800">
                    {userStats.total_points.toLocaleString()}
                  </Text>
                </View>
                <Text className="text-xs text-textSecondary-500">Puntos</Text>
              </View>
              <View className="mx-4 w-px bg-primary-200" />
              <View className="flex-1 items-center">
                <View className="mb-1 flex-row items-center">
                  <Ionicons name="heart" size={16} className="mr-1 text-danger-500" />
                  <Text className="text-lg font-bold text-textPrimary-800">
                    {userStats.lives}/5
                  </Text>
                </View>
                <Text className="text-xs text-textSecondary-500">Vidas</Text>
              </View>
            </View>
          </View>

          {/* Financial Summary */}
          <View className="mb-6">
            <Text className="mb-4 text-lg font-bold text-textPrimary-800">Resumen Financiero</Text>
            <View className="rounded-2xl bg-background-100 p-4">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-sm text-textSecondary-500">Balance Total</Text>
                <Text
                  className={`text-2xl font-bold ${userBalance?.balance! >= 0 ? "text-success-600" : "text-danger-500"}`}
                >
                  S/.{userBalance?.balance.toLocaleString()}
                </Text>
              </View>
              <View className="flex-row">
                <View className="mr-2 flex-1">
                  <Text className="mb-1 text-xs text-textSecondary-500">Ingresos</Text>
                  <Text className="font-semibold text-success-600">
                    +S/.{userBalance?.totalIncome.toLocaleString()}
                  </Text>
                </View>
                <View className="ml-2 flex-1">
                  <Text className="mb-1 text-xs text-textSecondary-500">Gastos</Text>
                  <Text className="font-semibold text-danger-500">
                    -S/.{userBalance?.totalExpense.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Learning Progress */}
          <View className="mb-6">
            <Text className="mb-4 text-lg font-bold text-textPrimary-800">
              Progreso de Aprendizaje
            </Text>
            <View className="flex-row">
              <StatCard
                title="Cursos"
                value={profileStats.completedCourses as any}
                subtitle="Completados"
                icon="school"
                color="secondary"
              />
              <StatCard
                title="Lecciones"
                value={`${profileStats.completedLessons}/${profileStats.totalLessons}`}
                subtitle="Progreso"
                icon="book"
                color="success"
              />
            </View>
          </View>

          {/* Menu Options */}
          <View className="mb-6">
            <Text className="mb-4 text-lg font-bold text-textPrimary-800">Configuración</Text>

            <MenuOption
              icon="person-circle"
              title="Editar Perfil"
              subtitle="Actualiza tu información personal"
              onPress={handleEditProfile}
            />

            <MenuOption
              icon="card"
              title="Gestión Financiera"
              subtitle="Presupuestos, categorías y transacciones"
              onPress={() => router.push("/(root)/(drawer)/(tabs)/home")}
            />

            <MenuOption
              icon="library"
              title="Mi Aprendizaje"
              subtitle="Cursos, progreso y certificados"
              onPress={() => router.push("/(root)/(drawer)/(tabs)/home")}
            />

            <MenuOption
              icon="people"
              title="Comunidades"
              subtitle={`Participas en ${profileStats.communitiesJoined} comunidades`}
              onPress={() => router.push("/(root)/(drawer)/(tabs)/home")}
            />

            <MenuOption
              icon="heart"
              title="Favoritos"
              subtitle={`${profileStats.favoriteCourses} cursos guardados`}
              onPress={() => router.push("/(root)/(drawer)/(tabs)/home")}
            />

            <MenuOption
              icon="notifications"
              title="Notificaciones"
              subtitle="Gestiona tus alertas y recordatorios"
              onPress={() => {}}
              showArrow={false}
              rightComponent={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#CBD2D9", true: "#00A6A6" }}
                  thumbColor={notificationsEnabled ? "#004E64" : "#9AA5B1"}
                />
              }
            />

            <MenuOption
              icon="moon"
              title="Modo Oscuro"
              subtitle="Cambia la apariencia de la app"
              onPress={() => {}}
              showArrow={false}
              rightComponent={
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: "#CBD2D9", true: "#00A6A6" }}
                  thumbColor={darkModeEnabled ? "#004E64" : "#9AA5B1"}
                />
              }
            />

            <MenuOption
              icon="help-circle"
              title="Ayuda y Soporte"
              subtitle="Preguntas frecuentes y contacto"
              onPress={() => router.push("/(root)/(drawer)/(tabs)/home")}
            />

            <MenuOption
              icon="shield-checkmark"
              title="Privacidad y Seguridad"
              subtitle="Configuración de cuenta y datos"
              onPress={() => router.push("/(root)/(drawer)/(tabs)/home")}
            />
          </View>

          {/* App Version */}
          <View className="mb-4 mt-6 items-center">
            <Text className="text-xs text-textSecondary-400">LuqaApp v1.0.0</Text>
            <Text className="mt-1 text-xs text-textSecondary-400">
              Última actualización: Junio 2025
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
