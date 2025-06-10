// components/MemberProfileItem.tsx
import { MemberCard } from '@/components/community/MemberCard';
import { Member } from '@/types/member';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';

interface MemberProfileItemProps {
  member: Member;
  onPress?: () => void;
}

export const MemberProfileItem: React.FC<MemberProfileItemProps> = ({ member, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Alert.alert(
        member.userFullName,
        `Rol: ${member.role}\nMiembro desde: ${member.joinDate || 'No disponible'}`
      );
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MemberCard member={member} />
    </TouchableOpacity>
  );
};
