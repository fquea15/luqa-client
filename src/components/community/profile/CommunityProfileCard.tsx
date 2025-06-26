// components/community/profiles/CommunityProfileCard.tsx
import { ICommunityProfile } from '@/shared/interfaces/community/ICommunityProfile';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface CommunityProfileCardProps {
  profile: ICommunityProfile;
}

export const CommunityProfileCard: React.FC<CommunityProfileCardProps> = ({ profile }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      {/* Header con imagen de fondo */}
      <View style={styles.headerBackground}>
        <View style={styles.avatarContainer}>
          {profile.imageUrl ? (
            <Image source={{ uri: profile.imageUrl }} style={styles.avatarLarge} />
          ) : (
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarText}>
                {profile.name.substring(0, 3).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <Text style={styles.title}>{profile.name}</Text>
        <Text style={styles.description}>{profile.description}</Text>

        {/* Grid de estadísticas */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>👥</Text>
            <Text style={styles.statNumber}>{profile.membersCount}</Text>
            <Text style={styles.statLabel}>Miembros</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💬</Text>
            <Text style={styles.statNumber}>{profile.messagesCount}</Text>
            <Text style={styles.statLabel}>Mensajes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📈</Text>
            <Text style={styles.statNumber}>{profile.activeUsersToday}</Text>
            <Text style={styles.statLabel}>Activos hoy</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statNumber}>{profile.growthPercentage}</Text>
            <Text style={styles.statLabel}>Crecimiento</Text>
          </View>
        </View>

        {/* Administrador */}
        <View style={styles.adminSection}>
          <View style={styles.adminInfo}>
            <Image
              source={{ uri: profile.adminAvatar }}
              style={styles.adminAvatar}
            />
            <View style={styles.adminDetails}>
              <Text style={styles.adminName}>{profile.adminName}</Text>
            </View>
          </View>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Administrador</Text>
          </View>
        </View>

      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
      {/*
      
        <TouchableOpacity style={styles.leaveButton}>
          <View style={styles.buttonIcon}>
            <Text style={styles.buttonIconText}>↗️</Text>
          </View>
          <Text style={styles.leaveButtonText}>Salir de la comunidad</Text>
        </TouchableOpacity>
      */}

      {/*
        <TouchableOpacity style={styles.reportButton}>
          <View style={styles.buttonIcon}>
            <Text style={styles.buttonIconText}>🧩</Text>
          </View>
          <Text style={styles.reportButtonText}>Modificar comunidad</Text>
        </TouchableOpacity>
        */}
    </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    height: 200,
    backgroundColor: '#B8E6E1',
    position: 'relative',
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  avatarLarge: {
    width: 190,
    height: 190,
    borderRadius: 40,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#888",
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00333C',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  adminSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  adminAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  adminAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  adminDetails: {
    flex: 1,
  },
  adminName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  adminBadge: {
    backgroundColor: '#00A6A6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adminBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  /*
  leaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A6A6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 12,
  },
  buttonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buttonIconText: {
    fontSize: 16,
  },
  leaveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },*/
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});