import { SearchFilter, SearchResultItem } from '@/components/community/SearchResultItem';
import { SearchType, useSearch } from '@/shared/hooks/useSearch';
import React from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchScreen() {
  const {
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
    results,
    loading,
    filters,
    updateFilters,
    clearSearch
  } = useSearch();

  const searchTypes: { key: SearchType; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'comunidades', label: 'Comunidades' },
    { key: 'miembros', label: 'Miembros' },
    { key: 'mensajes', label: 'Mensajes' }
  ];

  const handleItemPress = (item: any) => {
    // Navegar según tipo de item
    console.log('Pressed:', item);
  };

  const renderResults = () => {
    const allResults = [
      ...results.comunidades.map(item => ({ ...item, type: 'comunidad' })),
      ...results.miembros.map(item => ({ ...item, type: 'miembro' })),
      ...results.mensajes.map(item => ({ ...item, type: 'mensaje' }))
    ];

    if (loading) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Buscando...</Text>
        </View>
      );
    }

    if (!searchQuery.trim()) {
      return (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-gray-500 text-center">
            Busca mensajes y archivos
          </Text>
        </View>
      );
    }

    if (allResults.length === 0) {
      return (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-gray-500 text-center">
            No se encontraron resultados
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
        renderItem={({ item }) => (
          <SearchResultItem
            item={item}
            type={item.type as any}
            onPress={handleItemPress}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3">
            <Text className="text-gray-600 text-xl">←</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-800">Búsqueda</Text>
        </View>
        <Text className="text-sm text-gray-500 mt-1">
          Encuentra mensajes y archivos
        </Text>
      </View>

      {/* Search Input */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Text className="text-gray-400 mr-2">🔍</Text>
          <TextInput
            className="flex-1 text-gray-800"
            placeholder="Buscar mensajes y archivos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Text className="text-gray-400">✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Type Tabs */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {searchTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                className={`px-4 py-2 rounded-full ${
                  searchType === type.key ? 'bg-teal-500' : 'bg-gray-100'
                }`}
                onPress={() => setSearchType(type.key)}
              >
                <Text className={`font-medium ${
                  searchType === type.key ? 'text-white' : 'text-gray-600'
                }`}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Filters (opcional) */}
      {searchQuery.length > 0 && (
        <SearchFilter filters={filters} onUpdateFilters={updateFilters} />
      )}

      {/* Results */}
      {renderResults()}
    </View>
  );
}