import type { Community } from '@/shared/services/communitiesService';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CommunityModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (communityData: { name: string; description: string; imageUrl: string }) => void | Promise<void>;
  community?: Community | null;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({
  visible,
  onClose,
  onSave,
  community,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    imageUrl: string;
  }>({
    name: '',
    description: '',
    imageUrl: '',
  });

  // ⚙️ Sync cuando cambia la comunidad que se edita
  useEffect(() => {
    setFormData({
      name: community?.name || '',
      description: community?.description || '',
      imageUrl: community?.imageUrl || '',
    });
  }, [community, visible]);

  const handleSave = () => {
    if (formData.name.trim() && formData.imageUrl) {
      onSave({
        name: formData.name.trim(),
        description: formData.description || '',
        imageUrl: formData.imageUrl,
      });
      onClose();
      setFormData({ name: '', description: '', imageUrl: '' });
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requieren permisos para acceder a la galería de imágenes.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: result.assets[0].uri, // 👈 Aquí deberías subirla a un servidor y obtener la URL pública
      }));
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="px-4 py-6 border-b border-gray-200">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-600 text-lg">Cancelar</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-800">
              {community ? 'Editar Comunidad' : 'Nueva Comunidad'}
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <Text className="text-teal-600 text-lg font-semibold">Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 px-4 py-6">
          {/* Nombre */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">Nombre de la comunidad</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Ej: Grupo de inversiones principiantes"
              value={formData.name}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
            />
          </View>

          {/* Descripción */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">Descripción</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Describe de qué trata tu comunidad..."
              value={formData.description}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, description: text }))}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Imagen */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">Imagen</Text>

            {formData.imageUrl ? (
              <Image
                source={{ uri: formData.imageUrl }}
                className="w-full h-48 rounded-lg mb-4"
                resizeMode="cover"
              />
            ) : null}

            <TouchableOpacity
              className="bg-teal-500 py-3 px-4 rounded-lg items-center"
              onPress={pickImage}
            >
              <Text className="text-white font-medium">
                {formData.imageUrl ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
