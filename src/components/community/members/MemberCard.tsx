import { IMember } from '@/shared/interfaces/members/IMember';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface MemberCardProps {
  member: IMember;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return '#E53935'; // danger-500
      case 'moderator':
        return '#00A6A6'; // secondary-500
      default:
        return '#5F6C7B'; // neutral-500
    }
  };

  const getRoleText = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'Admin';
      case 'moderator':
        return 'Moderador';
      default:
        return 'Miembro';
    }
  };

  return (
    <View style={[styles.card, member.isCurrentUser && styles.currentUserCard]}>
      <Image
        source={{ uri: member.avatarUrl || 'https://pixabay.com/es/vectors/foto-de-perfil-en-blanco-973460/'  }}
        style={styles.avatar}
        defaultSource={{ uri: 'https://pixabay.com/es/vectors/foto-de-perfil-en-blanco-973460/'  }}
      />

      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {member.name}
          </Text>
          {member.isCurrentUser && (
            <Text style={styles.youLabel}>(Tú)</Text>
          )}
        </View>

        <View style={[styles.roleContainer, { backgroundColor: getRoleColor(member.role) }]}>
          <Text style={styles.roleText}>
            {getRoleText(member.role)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // background-50
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  currentUserCard: {
    borderWidth: 2,
    borderColor: '#004E64', // primary-500
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F7FA', // neutral-100
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A', // textPrimary-800
  },
  youLabel: {
    fontSize: 14,
    color: '#004E64', // primary-500
    marginLeft: 6,
    fontWeight: '500',
  },
  roleContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    color: '#FFFFFF', // textPrimary-50
    fontWeight: '600',
  },
});