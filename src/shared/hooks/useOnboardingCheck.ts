import { useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

import { useRegisterModal } from '@/shared/hooks/useRegisterModal';
import { useBoundStore } from '@/shared/store';
import { IUserBalance } from '@/shared/interfaces/user-interface';

export const useOnboardingCheck = (userId: number) => {
  const setUserBalance = useBoundStore((state) => state.setUserBalance);
  const openModal = useRegisterModal((state) => state.onOpen);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const res = await axios.get<IUserBalance>(`/api/Budgets/by-user/${userId}`);
        if (!res.data || res.data.balance === 0) {
          openModal(); // Abre el modal si no hay presupuesto
        } else {
          setUserBalance(res.data);
        }
      } catch (error) {
        console.error('Error al verificar presupuesto del usuario:', error);
        Alert.alert('Error', 'No se pudo cargar tu presupuesto');
      }
    };

    if (userId) {
      fetchUserBalance();
    }
  }, [userId]);
};
