import { ICommunity } from "@/shared/interfaces/community/ICommunity";
import { communityService } from "@/shared/services/community/communityService";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CommunitySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ICommunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.trim() === "") {
      setResults([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await communityService.searchCommunities(text);
      setResults(data);
    } catch (err) {
      setError("Error al buscar comunidades.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ICommunity }) => (
    <TouchableOpacity style={styles.communityCard} activeOpacity={0.7}>
      <View style={styles.communityHeader}>
        <Text style={styles.communityName}>{item.name}</Text>
        {/* 
        <View style={styles.membersBadge}>
          <Text style={styles.membersText}>{item.membersCount}</Text>
        </View>
        */}
      </View>
      {item.description && (
        <Text style={styles.communityDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Buscar comunidades..."
        placeholderTextColor="#B8C4D0"
        style={styles.searchInput}
      />

      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color="#00A6A6" />
          <Text style={styles.loadingText}>Buscando comunidades...</Text>
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
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No se encontraron comunidades</Text>
              <Text style={styles.emptySubtitle}>Intenta con un término diferente</Text>
            </View>
          ) : (
            !loading && !error && query.trim() === "" ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Descubre comunidades</Text>
                <Text style={styles.emptySubtitle}>Escribe para buscar comunidades interesantes</Text>
              </View>
            ) : null
          )
        }
      />
    </View>
  );
}

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

  communityCard: {
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

  communityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  communityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A", // textPrimary-800
    flex: 1,
    marginRight: 12,
  },

  membersBadge: {
    backgroundColor: "#E0F2F5", // primary-50
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#004E64", // primary-500
  },

  membersText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#004E64", // primary-500
  },

  communityDescription: {
    fontSize: 14,
    color: "#5F6C7B", // textSecondary-500
    lineHeight: 20,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A", // textPrimary-800
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#5F6C7B", // textSecondary-500
    textAlign: "center",
    lineHeight: 20,
  },
});