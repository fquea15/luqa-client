import { MemberCard } from "@/components/community/members/MemberCard";
import { IMember } from "@/shared/interfaces/members/IMember";
import { membersService } from "@/shared/services/community/membersService";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const MembersScreen: React.FC = () => {
  const { id, name } = useLocalSearchParams<{
    id: string;
    name?: string;
  }>();

  const communityId = Number(id);
  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      if (!communityId) {
        setError("ID de comunidad no válido");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await membersService.getCommunityMembers(communityId);
        if (isMounted) {
          setMembers(data);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
        if (isMounted) {
          setError("Error al cargar los miembros");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMembers();

    return () => {
      isMounted = false;
    };
  }, [communityId]);

  const handleSearchPress = () => {
    const searchUrl = "/(root)/(community)/search/MemberSearch";
    router.push({
      pathname: searchUrl,
      params: {
        communityId: communityId.toString(),
        communityName: name
      }
    });
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSearchPress}
          style={styles.searchButton}
        >
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSearchPress]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#004E64" />
        <Text style={styles.loadingText}>Cargando miembros...</Text>
      </View>
    );
  }

  const sortedMembers = [...members].sort((a, b) => {
    if (a.isCurrentUser) return -1;
    if (b.isCurrentUser) return 1;
    return 0;
  });

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            setLoading(true);
            setMembers([]);
          }}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Lista de miembros */}
      {members.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay miembros en esta comunidad</Text>
        </View>
      ) : (
        <FlatList
          data={sortedMembers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MemberCard member={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC", // background-100
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#5F6C7B", // textSecondary-500
  },
  errorText: {
    fontSize: 16,
    color: "#E53935", // danger-500
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#004E64", // primary-500
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF", // textPrimary-50
    fontSize: 16,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 16,
    color: "#5F6C7B", // textSecondary-500
    textAlign: "center",
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  separator: {
    height: 4,
    backgroundColor: "#CBD2D9", // neutral-300
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  searchIcon: {
    fontSize: 20,
    color: "#004E64", // primary-500
  },
});

export default MembersScreen;