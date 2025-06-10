import type { Community } from '@/types/community';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type CommunityCardProps = {
  community: Community;
  onJoinToggle: (communityId: number, isJoined: boolean) => void;
  onEdit: () => void;
  onPress: () => void; // 👉 Navegación al detalle
};

export const CommunityCard = ({ community, onJoinToggle, onEdit, onPress }: CommunityCardProps) => {
  const {
    communityId, 
    name,
    description,
    imageUrl,
    members,
    isActive,     
    lastActivity,
    isJoined,
  } = community;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View className="mx-4 mb-4 p-4 rounded-2xl bg-white shadow-sm">
        {/* Header con imagen y título */}
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden items-center justify-center mr-3">
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} className="w-10 h-10" />
            ) : (
              <Text className="text-gray-400 text-xl">📷</Text> // Placeholder si no hay imagen
            )}
          </View>
          <Text className="text-lg font-semibold text-gray-800 flex-1">{name}</Text>
        </View>

        {/* Descripción */}
        <Text className="text-sm text-gray-600 mb-2">{description}</Text>

        {/* Información de miembros y actividad */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className="flex-row items-center mr-4">
              <Text className="text-xs text-gray-600 mr-1">👥</Text>
              <Text className="text-xs text-gray-600">{members ?? 0}</Text>
              <Text className="text-xs text-gray-500 ml-1">miembros</Text>
            </View>

            {isActive && (
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                <Text className="text-xs text-gray-600">ACTIVO</Text>
              </View>
            )}
          </View>

          {lastActivity && <Text className="text-xs text-gray-500">{lastActivity}</Text>}
        </View>

        {/* Botones */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${isJoined ? 'bg-gray-400' : 'bg-teal-500'}`}
            onPress={() => onJoinToggle(communityId, isJoined ?? false)} // ✅ actualizado
          >
            <Text className="text-white text-sm font-medium">
              {isJoined ? 'Unido' : 'Unirse'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-2 px-4 rounded-full bg-gray-200 ml-2"
            onPress={onEdit}
          >
            <Text className="text-xs text-gray-600">Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
