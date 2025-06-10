import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';

import { MemberProfileItem } from '@/components/community/ProfileItem';
import { useMemberProfile } from '@/shared/hooks/useMember-Profile';

export default function MemberProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const communityId = Number(id);

  const {
    communityData,
    members,
    loading,
    error,
  } = useMemberProfile(communityId);

  if (loading || !communityData) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#14B8A6" />
        <Text className="mt-4 text-gray-600">Cargando comunidad...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-4">
        <Text className="text-red-600 text-center">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <Text className="text-xl font-bold text-gray-900">
          {communityData.name}
        </Text>
        <Text className="text-gray-600">{communityData.description}</Text>
      </View>

      <Text className="px-4 py-2 text-lg font-semibold text-gray-800">
        Miembros ({members.length})
      </Text>

      <FlatList
        data={members}
        keyExtractor={(item) => item.memberId.toString()}
        renderItem={({ item }) => <MemberProfileItem member={item} />}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 py-8">
            No hay miembros en esta comunidad
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
