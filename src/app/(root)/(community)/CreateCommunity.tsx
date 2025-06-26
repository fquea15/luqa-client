// screens/community/CreateCommunityScreen.tsx

import { CreateCommunityForm } from '@/components/community/communities/CreateCommunityForm';
import { ICreateCommunity } from '@/shared/interfaces/community/ICommunity';
import { communityService } from '@/shared/services/community/communityService';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

const CreateCommunityScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleCreateCommunity = async (data: ICreateCommunity) => {
        setLoading(true);
        try {
            // Llama a tu servicio de API para crear la comunidad
            await communityService.createCommunity(data);
            Alert.alert('¡Comunidad creada!', 'Tu comunidad ha sido creada exitosamente.');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error?.message || 'No se pudo crear la comunidad.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <CreateCommunityForm onSubmit={handleCreateCommunity} />
            {loading && (
                <View style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10
                }}>
                    <ActivityIndicator size="large" color="#00A6A6" />
                </View>
            )}
        </View>
    );
};

export default CreateCommunityScreen;