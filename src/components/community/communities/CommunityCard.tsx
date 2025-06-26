// components/community/communities/CommunityCard.tsx
import { ICommunity } from "@/shared/interfaces/community/ICommunity";
import { apiService } from "@/shared/services/api";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";

interface CommunityCardProps {
  community: ICommunity;
  onJoin?: (communityId: number) => void;
  onLeave?: (communityId: number) => void;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community, onJoin, onLeave }) => {
  const { userInfo } = useAppStore() as UserState;
  const handlePress = () => {
    if (community.isJoined) {
      router.push({
        pathname: `/(root)/(community)/${community.id}`,
        params: {
          id: community.id.toString(),
          currentUserId: userInfo?.userId,
          currentUserName: userInfo?.fullName,
          name: community.name,
        },
      });
    } else {
    }
  };

  const handleJoinToggle = () => {
    if (community.isJoined) {
      onLeave?.(community.id);
    } else {
      onJoin?.(community.id);
    }
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: community.imageUrl || "https://www.istockphoto.com/es/fotos/errores" }}
          style={styles.image}
          defaultSource={{ uri: "https://www.istockphoto.com/es/fotos/errores" }}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {community.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {community.description}
        </Text>
        <View style={styles.membersContainer}>
          <View style={styles.membersBadge}>
            <Text style={styles.members}>{community.membersCount} miembros</Text>
          </View>
        </View>
      </View>

      <Pressable
        style={[styles.joinButton, community.isJoined && styles.joinedButton]}
        onPress={handleJoinToggle}
      >
        <Text style={[styles.joinText, community.isJoined && styles.joinedText]}>
          {community.isJoined ? "Unido" : "Unirse"}
        </Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF", // background-50 - Blanco puro para cards
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16, // Bordes más suaves
    shadowColor: "#004E64", // primary-500 - Sombra con color de marca
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E8EDF2", // background-300 - Borde sutil
  },
  imageContainer: {
    marginRight: 16,
    shadowColor: "#004E64",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F3F6F9", // background-200 - Placeholder más suave
    borderWidth: 2,
    borderColor: "#E0F2F5", // primary-50 - Borde suave azul
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: "700", // Más peso para jerarquía
    color: "#1A1A1A", // textPrimary-800 - Texto principal
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 14,
    color: "#5F6C7B", // textSecondary-500 - Texto secundario
    marginBottom: 8,
    lineHeight: 20,
  },
  membersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  membersBadge: {
    backgroundColor: "#E0F2F5", // primary-50 - Fondo suave azul
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#B3DDE5", // primary-100 - Borde más definido
  },
  members: {
    fontSize: 12,
    color: "#004E64", // primary-500 - Color principal
    fontWeight: "600",
  },
  joinButton: {
    backgroundColor: "#004E64", // primary-500 - Botón principal
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    minWidth: 80,
    shadowColor: "#004E64",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  joinedButton: {
    backgroundColor: "#4CAF50", // success-500 - Verde para estado unido
    shadowColor: "#4CAF50",
  },
  joinText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  joinedText: {
    color: "#FFFFFF",
  },
});
