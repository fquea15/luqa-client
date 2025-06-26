import { IMember } from "@/shared/interfaces/members/IMember";
import { membersService } from "@/shared/services/community/membersService";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";

const MemberSearchScreen: React.FC = () => {
  const { communityId } = useLocalSearchParams<{ communityId: string }>();
  const parsedCommunityId = Number(communityId);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (text: string) => {
    setQuery(text);
    setLoading(true);
    setError(null);
    try {
      const data = await membersService.searchMembers(parsedCommunityId, text);
      setResults(data);
    } catch (err) {
      setError("Error al buscar miembros.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (parsedCommunityId) {
      handleSearch("");
    } else {
      console.warn("⚠️ No se recibió communityId válido");
    }
  }, [parsedCommunityId]);

  const renderItem = ({ item }: { item: IMember }) => (
    <View style={styles.memberCard}>
      {item.avatarUrl ? (
        <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder} />
      )}
      <View style={styles.memberInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{item.name}</Text>
          {item.isCurrentUser && <Text style={styles.youBadge}>Tú</Text>}
        </View>
        <Text style={styles.role}>{item.role}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Buscar miembros..."
        placeholderTextColor="#B8C4D0"
        style={styles.searchInput}
      />
      
      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color="#00A6A6" />
          <Text style={styles.loadingText}>Buscando...</Text>
        </View>
      )}
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && !error && query.trim() !== "" ? (
            <Text style={styles.emptyText}>No se encontraron miembros</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC", // background-100
    padding: 20,
  },
  
  searchInput: {
    height: 48,
    backgroundColor: "#FFFFFF", // background-50
    borderWidth: 1,
    borderColor: "#E8EDF2", // background-300
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1A1A1A", // textPrimary-800
    marginBottom: 20,
    shadowColor: "#004E64",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: "#5F6C7B", // textSecondary-500
  },

  errorText: {
    color: "#E53935", // danger-500
    textAlign: "center",
    marginBottom: 16,
    fontSize: 14,
    fontWeight: "500",
  },

  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // background-50
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#004E64",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#E8EDF2", // background-300
  },

  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 16,
    backgroundColor: "#E8EDF2", // background-300
  },

  memberInfo: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A", // textPrimary-800
  },

  youBadge: {
    fontSize: 11,
    fontWeight: "600",
    color: "#00A6A6", // secondary-500
    backgroundColor: "#E0F7F7", // secondary-50
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },

  role: {
    fontSize: 14,
    color: "#5F6C7B", // textSecondary-500
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#5F6C7B", // textSecondary-500
  },
});

export default MemberSearchScreen;