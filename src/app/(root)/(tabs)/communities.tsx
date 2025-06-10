import { CommunityCard } from '@/components/community/CommunityCard';
import { CommunityModal } from '@/components/community/CommunityModal';
import { useCommunities } from '@/shared/hooks/useCommunities';
import { communitiesService } from '@/shared/services/communitiesService';
import type { Community } from '@/types/community';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function CommunitiesScreen() {
  const {
    communities,
    loading,
    error,
    onRefresh,
    showModal,
    editingCommunity,
    openCreateModal,
    openEditModal,
    closeModal,
    saveCommunity,
  } = useCommunities();

  const router = useRouter();

  const handleJoinToggle = async (communityId: number, isJoined: boolean) => {
    try {
      if (isJoined) {
        await communitiesService.leaveCommunity(communityId);
      } else {
        await communitiesService.joinCommunity(communityId);
      }
      onRefresh();
    } catch (err) {
      console.error(err);
      // Aquí puedes mostrar feedback visual si quieres
    }
  };

  const renderCommunity = ({ item }: { item: Community }) => (
    <CommunityCard
      community={item}
      onJoinToggle={handleJoinToggle}
      onEdit={() => openEditModal(item)}
      onPress={() =>
        router.push({
          pathname: '/(root)/(communities)/(message)/[id]/message',
          params: { id: item.communityId.toString() },
        })
      }
    />
  );
  
  
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="bg-white px-4 py-6 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity className="p-2">
            <Text className="text-2xl">☰</Text>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <Text className="text-red-500 text-lg font-bold mr-2">🦊</Text>
            <Text className="text-gray-800 text-lg font-bold">Luqa</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-teal-600 mb-1">Comunidades</Text>
            <Text className="text-gray-600 text-sm">
              Aprende a manejar tu dinero de manera inteligente
            </Text>
          </View>

          <TouchableOpacity
            className="p-2"
            onPress={() => router.push('/(root)/(communities)/(search)/search')}
          >
            <Text className="text-gray-600 text-xl">🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de comunidades */}
      <FlatList
        data={communities}
        renderItem={renderCommunity}
        keyExtractor={(item) => item.communityId.toString()} // ✅ actualizado
        contentContainerStyle={{ paddingVertical: 16 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} colors={['#14b8a6']} />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Error message */}
      {error && (
        <View className="absolute bottom-4 left-4 right-4 bg-red-100 p-3 rounded-lg">
          <Text className="text-red-600 text-center">{error}</Text>
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-teal-600 rounded-full items-center justify-center shadow-lg"
        activeOpacity={0.8}
        onPress={openCreateModal}
      >
        <Text className="text-white text-2xl font-light">+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <CommunityModal
        visible={showModal}
        onClose={closeModal}
        onSave={saveCommunity}
        community={editingCommunity}
      />
    </View>
  );
}
