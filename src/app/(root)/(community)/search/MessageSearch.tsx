import { IMessage } from "@/shared/interfaces/message/IMessage";
import { communityProfileService } from "@/shared/services/community/communityprofileService";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

const MessageSearchScreen: React.FC = () => {
  const { communityId } = useLocalSearchParams<{ communityId: string }>();
  const parsedCommunityId = Number(communityId);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IMessage[]>([]);
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para formatear el tiempo a HH:MM
  const formatTime = (timestamp: string | Date): string => {
    try {
      const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
      
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        return "00:00";
      }
      
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return "00:00";
    }
  };

  // Cargar todos los mensajes al montar
  useEffect(() => {
    if (!parsedCommunityId) return;
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await communityProfileService.getCommunityMessages(parsedCommunityId);
        setAllMessages(data);
        setResults(data);
      } catch (err) {
        setError("Error al cargar mensajes.");
        setAllMessages([]);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [parsedCommunityId]);

  // Filtrar mensajes al buscar
  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === "") {
      setResults(allMessages);
      return;
    }
    const filtered = allMessages.filter(
      (msg) =>
        msg.content.toLowerCase().includes(text.toLowerCase()) ||
        msg.senderName.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  const renderItem = ({ item }: { item: IMessage }) => (
    <View style={[styles.messageContainer, item.isCurrentUser ? styles.myMessageContainer : styles.otherMessageContainer]}>
      <View style={[styles.messageBubble, item.isCurrentUser ? styles.myMessage : styles.otherMessage]}>
        {!item.isCurrentUser && (
          <Text style={styles.senderName}>{item.senderName}</Text>
        )}
        <Text style={[styles.messageContent, item.isCurrentUser ? styles.myMessageText : styles.otherMessageText]}>
          {item.content}
        </Text>
        <View style={styles.timestampContainer}>
          <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Buscar por contenido o remitente..."
        placeholderTextColor="#B8C4D0"
        style={styles.searchInput}
      />

      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color="#00A6A6" />
          <Text style={styles.loadingText}>Cargando mensajes...</Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesList}
        ListEmptyComponent={
          !loading && !error ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>
                {query.trim() !== "" ? "No se encontraron mensajes" : "No hay mensajes"}
              </Text>
              <Text style={styles.emptySubtitle}>
                {query.trim() !== "" ? "Intenta con otro término de búsqueda" : "Aún no hay mensajes en esta comunidad"}
              </Text>
            </View>
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
  },

  searchInput: {
    height: 48,
    padding: 11,
    backgroundColor: "#FFFFFF", // background-50
    borderWidth: 1,
    borderColor: "#E8EDF2", // background-300
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 17,
    color: "#1A1A1A", // textPrimary-800
    margin: 15,
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
    marginHorizontal: 20,
    fontSize: 14,
    fontWeight: "500",
  },

  messagesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  messageContainer: {
    marginBottom: 12,
  },

  myMessageContainer: {
    alignItems: "flex-end",
  },

  otherMessageContainer: {
    alignItems: "flex-start",
  },

  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    shadowColor: "#004E64",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  myMessage: {
    backgroundColor: "#E0F7F7", // secondary-50
    borderColor: "#00A6A6", // secondary-500
    borderWidth: 1,
    borderBottomRightRadius: 4,
  },

  otherMessage: {
    backgroundColor: "#FFFFFF", // background-50
    borderColor: "#E8EDF2", // background-300
    borderWidth: 1,
    borderBottomLeftRadius: 4,
  },

  senderName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#004E64", // primary-500
    marginBottom: 4,
  },

  messageContent: {
    fontSize: 15,
    lineHeight: 20,
  },

  myMessageText: {
    color: "#1A1A1A", // textPrimary-800
  },

  otherMessageText: {
    color: "#1A1A1A", // textPrimary-800
  },

  timestampContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },

  timestamp: {
    fontSize: 11,
    color: "#9AAAB8", // textSecondary-400
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

export default MessageSearchScreen;