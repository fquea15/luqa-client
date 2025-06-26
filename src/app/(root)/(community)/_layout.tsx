// app/(root)/(community)/_layout.tsx
import DropdownMenu from "@/components/community/options/DropdownMenu";
import { chatHubService } from "@/shared/services/community/chatHubService";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ChatScreenParams {
  id: string;
  name?: string;
  currentUserId?: string;
  currentUserName?: string;
}

const Layout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentCommunityId, setCurrentCommunityId] = useState<string>("");
  const [currentCommunityName, setCurrentCommunityName] = useState<string>("");
  const [activeUsers, setActiveUsers] = useState<number>(0);

  // ✅ Escuchar cambios en el número de usuarios activos
  useEffect(() => {
    chatHubService.onUsersInChannelChanged((count) => setActiveUsers(count));
    return () => {
      chatHubService.offUsersInChannelChanged();
    };
  }, []);

  const getMenuOptions = (communityId: string, communityName: string) => [
    {
      label: "Ver Miembros",
      icon: "👥",
      onPress: () => {
        router.push({
          pathname: `/(root)/(community)/members/${communityId}`,
          params: { name: communityName }
        });
      }
    },
    {
      label: "Buscar Mensajes",
      icon: "🔍",
      onPress: () => {
        router.push({
          pathname: "/(root)/(community)/search/MessageSearch",
          params: { communityId, communityName }
        });
      }
    },
    {
      label: "Perfil de Comunidad",
      icon: "🌐",
      onPress: () => {
        router.push({
          pathname: `/(root)/(community)/profile/${communityId}`,
          params: { name: communityName }
        });
      }
    }
  ];

  return (
    <>
      <Stack>
        {/* Pantallas de búsqueda */}
        <Stack.Screen name="search/CommunitySearch" options={{ title: "Buscar Comunidades" }} />
        <Stack.Screen name="search/MemberSearch" options={{ title: "Buscar Miembros" }} />
        <Stack.Screen name="search/MessageSearch" options={{ title: "Buscar Mensajes" }} />

        {/* Chat */}
        <Stack.Screen
          name="[id]"
          options={({ route }) => {
            const { id, name } = route.params as ChatScreenParams;

            return {
              headerTitle: () => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/(root)/(community)/profile/[id]",
                      params: { id, name }
                    })
                  }
                >
                  <View>
                    <Text style={styles.communityName}>{name || "Chat"}</Text>
                    <Text style={styles.activeUsersText}>{activeUsers} activos</Text>
                  </View>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    setCurrentCommunityId(id);
                    setCurrentCommunityName(name || "Chat");
                    setShowDropdown(true);
                  }}
                  style={styles.menuButton}
                >
                  <Text style={styles.menuIcon}>⋮</Text>
                </TouchableOpacity>
              )
            };
          }}
        />

        {/* Pantalla de miembros */}
        <Stack.Screen name="members/[id]" options={{ title: "Miembros" }} />

        {/* Perfil de comunidad */}
        <Stack.Screen name="profile/[id]" options={{ title: "Perfil de la Comunidad" }} />
        
        <Stack.Screen
          name="CreateCommunity"
          options={{ title: "Crear Comunidad" }}
        />

      </Stack>

      <DropdownMenu
        visible={showDropdown}
        onClose={() => setShowDropdown(false)}
        options={getMenuOptions(currentCommunityId, currentCommunityName)}
        anchorPosition={{ x: 350, y: 100 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: { padding: 8 },
  activeUsersText: {
    fontSize: 13,
    color: "#4CAF50",
    textAlign: "left",
    marginTop: 2,
  },
  menuIcon: {
    fontSize: 24,
    color: "#007AFF",
    paddingRight: 10,
  },
  communityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 20,
  },
});

export default Layout;
