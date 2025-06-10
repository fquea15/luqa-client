import { Community } from '@/types/community';
import { useEffect, useState } from 'react';
import { communitiesService } from '../services/communitiesService';

export const useCommunities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const data = await communitiesService.getCommunities();
      setCommunities(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al cargar las comunidades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const onRefresh = () => fetchCommunities();

  const handleJoinToggle = async (community: Community) => {
    try {
      if (community.isJoined) {
        await communitiesService.leaveCommunity(community.communityId); // ✅ Actualizado a communityId
      } else {
        await communitiesService.joinCommunity(community.communityId); // ✅ Actualizado a communityId
      }
      fetchCommunities();
    } catch (err) {
      console.error(err);
      setError('Error al actualizar la membresía');
    }
  };

  const openCreateModal = () => {
    setEditingCommunity(null);
    setShowModal(true);
  };

  const openEditModal = (community: Community) => {
    setEditingCommunity(community);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCommunity(null);
  };

  const saveCommunity = async (data: { name: string; description: string; imageUrl: string }) => {
    try {
      console.log('📦 Datos que se enviarán al backend:', data);
  
      if (editingCommunity) {
        // En update SÍ necesitas el id para saber qué comunidad editar
        await communitiesService.updateCommunity(editingCommunity.communityId, data);
      } else {
        // Crear SOLO necesita name, description, imageUrl
        await communitiesService.createCommunity(data);
      }
  
      fetchCommunities();
      closeModal();
    } catch (err) {
      console.error('❌ Error en saveCommunity:', err);
      setError('Error al guardar la comunidad');
    }
  };
  

  return {
    communities,
    loading,
    error,
    onRefresh,
    handleJoinToggle,
    showModal,
    editingCommunity,
    openCreateModal,
    openEditModal,
    closeModal,
    saveCommunity,
  };
};
