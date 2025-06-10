import { Member } from '@/types/member';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface MemberCardProps {
  member: Member;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <View className="flex-row items-center p-4 bg-white border-b border-gray-200">
      <Image
        source={{ uri: member.avatarUrl || 'https://via.placeholder.com/40' }}
        className="w-10 h-10 rounded-full mr-4"
      />
      <View>
        <Text className="text-gray-900 font-semibold">{member.userFullName}</Text>
        <Text className="text-gray-600 text-sm">{member.role}</Text>
      </View>
    </View>
  );
};
