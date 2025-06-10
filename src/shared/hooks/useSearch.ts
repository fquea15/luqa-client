import { searchService } from '@/shared/services/searchService';
import { useEffect, useState } from 'react';

// Reutilizamos SearchType
export type SearchType = 'todos' | 'comunidades' | 'miembros' | 'mensajes';

// Importamos el tipo SearchResults desde el service
type SearchResults = Awaited<ReturnType<typeof searchService.search>>;

interface SearchFilters {
  date?: string;
  isActive?: boolean;
}

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('todos');
  const [results, setResults] = useState<SearchResults>({
    comunidades: [],
    miembros: [],
    mensajes: []
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  const performSearch = async (query: string, type: SearchType) => {
    if (!query.trim()) {
      setResults({ comunidades: [], miembros: [], mensajes: [] });
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchService.search(query, type, filters);
      setResults(searchResults);
    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setLoading(false);
    }
  };

  // Búsqueda con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery, searchType);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchType, filters]);

  const clearSearch = () => {
    setSearchQuery('');
    setResults({ comunidades: [], miembros: [], mensajes: [] });
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
    results,
    loading,
    filters,
    updateFilters,
    clearSearch,
    performSearch
  };
};
