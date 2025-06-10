import { communitiesService } from '@/shared/services/communitiesService';
import { memberService } from '@/shared/services/memberServices';
import { Community } from '@/types/community';
import { Member } from '@/types/member';
import { useEffect, useState } from 'react';

export function useMemberProfile(communityId: number) {
  const [communityData, setCommunityData] = useState<Community | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    if (!communityId) return;
    try {
      setLoading(true);
      setError(null);

      const [community, membersList] = await Promise.all([
        communitiesService.getCommunityById(communityId),
        memberService.getMembersByCommunityId(communityId),
      ]);

      setCommunityData(community);
      setMembers(membersList);
    } catch (err: any) {
      setError(err.message || 'Error al cargar datos');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const leaveCommunity = async (memberId: number) => {
    try {
      await memberService.leaveCommunity(memberId);
      setMembers(prev => prev.filter(m => m.memberId !== memberId));
      return true;
    } catch (err) {
      console.error('Error leaving community:', err);
      return false;
    }
  };

  useEffect(() => {
    loadProfile();
  }, [communityId]);

  return {
    communityData,
    members,
    loading,
    error,
    refreshProfile: loadProfile,
    leaveCommunity,
  };
}