import { ICreateCommunity } from '@/shared/interfaces/community/ICommunity';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CreateCommunityFormProps {
    community?: ICreateCommunity;
    onSubmit?: (data: ICreateCommunity) => void;
}

export const CreateCommunityForm: React.FC<CreateCommunityFormProps> = ({ 
    community, 
    onSubmit 
}) => {
    const [formData, setFormData] = useState<ICreateCommunity>({
        name: community?.name || '',
        description: community?.description || '',
        imageUrl: community?.imageUrl || '',
    });

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const updateField = (field: keyof ICreateCommunity, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <View style={styles.container}>

            <View style={styles.avatarContainer}>
                {formData.imageUrl ? (
                    <Image 
                        source={{ uri: formData.imageUrl }} 
                        style={styles.avatarLarge}
                        defaultSource={{ uri: 'https://img.freepik.com/vector-premium/imagen-icono-imagen-vectorial-puede-utilizar-interfaz-usuario_120816-260360.jpg' }}
                    />
                ) : (
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarText}>
                            {formData.name ? formData.name.substring(0, 2).toUpperCase() : 'IMG'}
                        </Text>
                    </View>
                )}
            </View>

            <Text style={styles.label}>Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la comunidad"
                placeholderTextColor="#aaa"
                value={formData.name}
                onChangeText={(text) => updateField('name', text)}
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe tu comunidad"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) => updateField('description', text)}
            />

            <Text style={styles.label}>Imagen (URL)</Text>
            <TextInput
                style={styles.input}
                placeholder="https://..."
                placeholderTextColor="#aaa"
                value={formData.imageUrl}
                onChangeText={(text) => updateField('imageUrl', text)}
            />

            <TouchableOpacity 
                style={[
                    styles.createButton, 
                    !formData.name.trim() && styles.createButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={!formData.name.trim()}
            >
                <Text style={styles.createButtonText}>
                    {community ? 'Actualizar comunidad' : 'Crear comunidad'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarLarge: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#888',
    },
    label: {
        fontSize: 14,
        color: '#00333C',
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    createButton: {
        backgroundColor: '#00A6A6',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    createButtonDisabled: {
        backgroundColor: '#ccc',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});