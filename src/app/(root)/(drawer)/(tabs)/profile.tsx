import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
  const { userProfile } = useAppStore() as UserState;
  const router = useRouter();

  const handleLogout = () => {
    console.log("Cerrando sesión...")
    router.replace("/(auth)/login")
  }

  const progressPercentage = Math.round((userProfile?.completedLessons! / userProfile?.totalLessons!) * 100)

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#004E64" />
      <View className="flex-1 bg-background-100">
        {/* Header con gradiente */}
        <LinearGradient
          colors={["#004E64", "#00A6A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-12 pb-20 px-4"
        >
          <View className="flex-row items-center justify-between mb-8">
            <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Mi Perfil</Text>
            <TouchableOpacity className="p-2">
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 -mt-16" showsVerticalScrollIndicator={false}>
          {/* Profile Card Principal */}
          <View className="mx-4 mb-6">
            <View className="bg-white rounded-3xl shadow-lg p-6 border border-background-200">
              {/* Avatar y Info Principal */}
              <View className="items-center mb-8">
                <View className="relative mb-4">
                  <View className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 p-1">
                    <Image
                      source={{ uri: userProfile?.profilePicture! ?? "https://th.bing.com/th/id/R.e8be15265742b4e9db4604fa6aa4b365?rik=wxglZbFwRedf5g&riu=http%3a%2f%2fhdqwalls.com%2fdownload%2fvery-cute-anime-girl-hd-3840x2160.jpg&ehk=uX69QCA1xP%2fZzQs4Jv%2boOQSFWkC7NWbBz60wV3AB0bM%3d&risl=&pid=ImgRaw&r=0" }}
                      style={{ width: 104, height: 104 }}
                      className="rounded-full bg-white"
                      placeholder="https://via.placeholder.com/104x104/F9FBFC/5F6C7B?text=👤"
                    />
                  </View>
                  <View className="absolute -bottom-1 -right-1 bg-success-500 rounded-full p-2 border-2 border-white">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                </View>

                <Text className="text-textPrimary-800 text-2xl font-bold mb-2">{userProfile?.full_name}</Text>
                <Text className="text-textSecondary-500 text-base mb-3">{userProfile?.email}</Text>

                <View className="bg-gradient-to-r from-secondary-100 to-primary-100 px-4 py-2 rounded-full border border-secondary-200">
                  <Text className="text-primary-700 text-sm font-semibold">{userProfile?.role}</Text>
                </View>
              </View>

              {/* Stats Grid */}
              <View className="gap-4">
                {/* Puntos Totales */}
                <View className="bg-gradient-to-r from-success-50 to-success-100 p-4 rounded-2xl border border-success-200">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                      <View className="bg-success-500 p-3 rounded-2xl shadow-sm">
                        <Ionicons name="trophy" size={24} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-textPrimary-800 text-lg font-bold">Puntos Totales</Text>
                        <Text className="text-textSecondary-500 text-sm">Acumulados hasta hoy</Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text className="text-success-600 text-2xl font-bold">{userProfile?.total_points}</Text>
                      <Text className="text-success-500 text-xs font-medium">+250 hoy</Text>
                    </View>
                  </View>
                </View>

                {/* Vidas */}
                <View className="bg-gradient-to-r from-danger-50 to-danger-100 p-4 rounded-2xl border border-danger-200">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                      <View className="bg-danger-500 p-3 rounded-2xl shadow-sm">
                        <Ionicons name="heart" size={24} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-textPrimary-800 text-lg font-bold">Vidas</Text>
                        <Text className="text-textSecondary-500 text-sm">Se recuperan cada 30 min</Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text className="text-danger-600 text-2xl font-bold">{userProfile?.lives}/5</Text>
                      <View className="flex-row gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <View
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < userProfile?.lives! ? "bg-danger-500" : "bg-danger-200"}`}
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                </View>

                {/* Progreso */}
                <View className="bg-gradient-to-r from-warning-50 to-warning-100 p-4 rounded-2xl border border-warning-200">
                  <View className="flex-row items-center gap-4 mb-4">
                    <View className="bg-warning-500 p-3 rounded-2xl shadow-sm">
                      <Ionicons name="book" size={24} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-textPrimary-800 text-lg font-bold">Progreso General</Text>
                      <Text className="text-textSecondary-500 text-sm">
                        {userProfile?.completedLessons} de {userProfile?.totalLessons} lecciones completadas
                      </Text>
                    </View>
                    <Text className="text-warning-600 text-2xl font-bold">{progressPercentage}%</Text>
                  </View>

                  {/* Barra de progreso mejorada */}
                  <View className="bg-warning-200 h-3 rounded-full overflow-hidden">
                    <View
                      className="bg-gradient-to-r from-warning-400 to-warning-600 h-full rounded-full shadow-sm"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </View>

                  <View className="flex-row justify-between mt-2">
                    <Text className="text-textSecondary-500 text-xs">Principiante</Text>
                    <Text className="text-textSecondary-500 text-xs">Experto</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Sección de Logros Recientes */}
          <View className="mx-4 mb-6">
            <Text className="text-textPrimary-800 text-lg font-bold mb-3">Logros Recientes</Text>
            <View className="bg-white rounded-2xl p-4 border border-background-200">
              <View className="flex-row items-center gap-3">
                <View className="bg-gradient-to-br from-secondary-400 to-primary-400 p-2 rounded-xl">
                  <Ionicons name="star" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-textPrimary-800 font-semibold">¡Primera semana completada!</Text>
                  <Text className="text-textSecondary-500 text-sm">Hace 2 días</Text>
                </View>
                <Text className="text-secondary-600 font-bold">+500</Text>
              </View>
            </View>
          </View>

          {/* Botón de Cerrar Sesión Mejorado */}
          <View className="mx-4 mb-8">
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-gradient-to-r from-danger-500 to-danger-600 p-4 rounded-2xl shadow-lg"
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center gap-3">
                <Ionicons name="log-out-outline" size={22} color="white" />
                <Text className="text-white text-lg font-bold">Cerrar Sesión</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  )
};

export default ProfileScreen;
