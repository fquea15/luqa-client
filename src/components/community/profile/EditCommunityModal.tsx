// components/community/profiles/EditCommunityModal.tsx
import { ICommunityProfile } from '@/shared/interfaces/community/ICommunityProfile';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface EditCommunityModalProps {
  visible: boolean;
  profile: ICommunityProfile;
  onClose: () => void;
  onSave: (data: { name: string; description: string; imageUrl: string }) => Promise<void>;
}

export const EditCommunityModal: React.FC<EditCommunityModalProps> = ({
  visible,
  profile,
  onClose,
  onSave
}) => {
  const [name, setName] = useState(profile.name);
  const [description, setDescription] = useState(profile.description);
  const [imageUrl, setImageUrl] = useState(profile.imageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'La descripción es obligatoria');
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        name: name.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim()
      });
      onClose();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la comunidad');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName(profile.name);
    setDescription(profile.description);
    setImageUrl(profile.imageUrl);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Editar Comunidad</Text>
            <Pressable onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.content}>
            <View style={styles.field}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nombre de la comunidad"
                maxLength={50}
                editable={!isLoading}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Descripción de la comunidad"
                multiline
                numberOfLines={4}
                maxLength={200}
                editable={!isLoading}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>URL de imagen</Text>
              <TextInput
                style={styles.input}
                value={imageUrl}
                onChangeText={setImageUrl}
                placeholder="https://..."
                keyboardType="url"
                editable={!isLoading}
              />
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            
            <Pressable
              style={[styles.button, styles.saveButton, isLoading && styles.disabledButton]}
              onPress={handleSave}
              disabled={isLoading}
            >
              <Text style={[styles.saveText, isLoading && styles.disabledText]}>
                {isLoading ? 'Guardando...' : 'Guardar'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 20,
    width: '90%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  cancelText: {
    color: '#666',
    fontWeight: '600',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
  disabledText: {
    color: '#999',
  },
});