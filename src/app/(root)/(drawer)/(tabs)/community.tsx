import { CommunityCard } from '@/components/community/communities/CommunityCard';
import { ICommunity } from '@/shared/interfaces/community/ICommunity';
import { communityService } from '@/shared/services/community/communityService';
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CommunityScreen() {
  const [communities, setCommunities] = useState<ICommunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadCommunities();
    }, [])
  );

  const loadCommunities = async () => {
    try {
      setLoading(true);
      const data = await communityService.getCommunities();
      setCommunities(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las comunidades');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCommunities();
    setRefreshing(false);
  };

  const handleJoinCommunity = async (communityId: number) => {
    try {
      await communityService.joinCommunity(communityId);
      setCommunities(prev =>
        prev.map(c =>
          c.id === communityId
            ? { ...c, isJoined: true, membersCount: c.membersCount + 1 }
            : c
        )
      );
      Alert.alert('¡Éxito!', 'Te has unido a la comunidad');
    } catch (error) {
      Alert.alert('Error', 'No se pudo unir a la comunidad');
    }
  };

  const handleLeaveCommunity = async (communityId: number) => {
    Alert.alert(
      'Salir de la comunidad',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            try {
              await communityService.leaveCommunity(communityId);
              setCommunities(prev =>
                prev.map(c =>
                  c.id === communityId
                    ? { ...c, isJoined: false, membersCount: c.membersCount - 1 }
                    : c
                )
              );
            } catch (error) {
              Alert.alert('Error', 'No se pudo salir de la comunidad');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#004E64" />
            <Text style={styles.loadingText}>Cargando comunidades...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Comunidades</Text>
          <Text style={styles.subtitle}>Descubre y únete a grupos</Text>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => router.push("/(root)/(community)/search/CommunitySearch")}
        >
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={communities}
          renderItem={({ item }) => (
            <CommunityCard
              community={item}
              onJoin={handleJoinCommunity}
              onLeave={handleLeaveCommunity}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#004E64']}
              tintColor="#004E64"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyContent}>
                <Text style={styles.emptyIcon}>🏘️</Text>
                <Text style={styles.emptyTitle}>No hay comunidades</Text>
                <Text style={styles.emptyText}>
                  Aún no se han creado comunidades. ¡Sé el primero en crear una!
                </Text>
              </View>
            </View>
          }
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(root)/(community)/CreateCommunity")}
      >
        <View style={styles.fabCircle}>
          <Text style={styles.fabPlus}>+</Text>
        </View>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC', // background-100 - Fondo principal
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF", // background-50 - Header blanco
    shadowColor: '#004E64',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF2", // background-300 - Borde sutil
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A', // textPrimary-800 - Título principal
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#5F6C7B', // textSecondary-500 - Subtítulo
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: '#E0F2F5', // primary-50 - Fondo suave
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B3DDE5', // primary-100 - Borde sutil
    shadowColor: '#004E64',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FBFC',
  },
  loadingContent: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 20,
    shadowColor: '#004E64',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#5F6C7B', // textSecondary-500
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyContent: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 20,
    shadowColor: '#004E64',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8EDF2',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A', // textPrimary-800
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#5F6C7B', // textSecondary-500
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 32,
    zIndex: 100,
  },
  fabCircle: {
    backgroundColor: '#00A6A6',
    width: 48,
    height: 44,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  fabPlus: {
    color: '#fff',
    fontSize: 25  ,
    fontWeight: 'bold',
    marginTop: -2,
    paddingBottom: 5,  
  },
});