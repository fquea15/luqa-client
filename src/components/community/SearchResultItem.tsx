import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SearchResultItemProps {
  item: any;
  type: 'comunidad' | 'miembro' | 'mensaje';
  onPress: (item: any) => void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ item, type, onPress }) => {
  if (type === 'comunidad') {
    return (
      <TouchableOpacity 
        className="flex-row items-center p-4 bg-white mb-2 rounded-lg shadow-sm"
        onPress={() => onPress(item)}
      >
        <View className="w-12 h-12 bg-teal-100 rounded-lg items-center justify-center mr-3">
          <Text className="text-teal-600 font-bold">👥</Text>
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-800">{item.name}</Text>
          <Text className="text-sm text-gray-500">{item.members} miembros • {item.isActive ? 'Activo' : 'Inactivo'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (type === 'miembro') {
    return (
      <TouchableOpacity 
        className="flex-row items-center p-4 bg-white mb-2 rounded-lg shadow-sm"
        onPress={() => onPress(item)}
      >
        <View className={`w-12 h-12 rounded-full items-center justify-center mr-3 ${
          item.avatar === 'MB' ? 'bg-purple-500' : 
          item.avatar === 'CL' ? 'bg-teal-500' : 
          item.avatar === 'JA' ? 'bg-blue-500' : 'bg-gray-500'
        }`}>
          <Text className="text-white font-bold">{item.avatar}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="font-semibold text-gray-800 mr-2">{item.name}</Text>
            {item.isOnline && <View className="w-2 h-2 bg-green-500 rounded-full" />}
          </View>
          <Text className="text-sm text-gray-500">{item.role}</Text>
        </View>
        {item.role === 'Admin' && (
          <View className="bg-purple-100 px-2 py-1 rounded">
            <Text className="text-purple-600 text-xs font-medium">Admin</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  if (type === 'mensaje') {
    return (
      <TouchableOpacity 
        className="p-4 bg-white mb-2 rounded-lg shadow-sm"
        onPress={() => onPress(item)}
      >
        <Text className="text-gray-800 mb-1">{item.text}</Text>
        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-500">{item.sender}</Text>
          <Text className="text-sm text-gray-400">{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

// components/search/SearchFilter.tsx
interface SearchFilterProps {
  filters: any;
  onUpdateFilters: (filters: any) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ filters, onUpdateFilters }) => {
  return (
    <View className="px-4 py-3 bg-gray-50 border-b border-gray-200">
      <Text className="text-sm font-medium text-gray-700 mb-2">Filtrar por fecha</Text>
      <View className="flex-row space-x-2">
        <TouchableOpacity 
          className={`px-3 py-1 rounded-full ${filters.date === 'today' ? 'bg-teal-500' : 'bg-white'}`}
          onPress={() => onUpdateFilters({ date: 'today' })}
        >
          <Text className={`text-sm ${filters.date === 'today' ? 'text-white' : 'text-gray-600'}`}>Hoy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`px-3 py-1 rounded-full ${filters.date === 'week' ? 'bg-teal-500' : 'bg-white'}`}
          onPress={() => onUpdateFilters({ date: 'week' })}
        >
          <Text className={`text-sm ${filters.date === 'week' ? 'text-white' : 'text-gray-600'}`}>Esta semana</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};