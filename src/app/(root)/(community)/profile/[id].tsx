// screens/CommunityProfileScreen.tsx
import { CommunityProfileCard } from "@/components/community/profile/CommunityProfileCard";
import { ICommunityProfile } from "@/shared/interfaces/community/ICommunityProfile";
import { communityProfileService } from "@/shared/services/community/communityprofileService";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

const CommunityProfileScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const communityId = Number(id);

  const [profile, setProfile] = useState<ICommunityProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      if (!communityId || isNaN(communityId)) {
        setError("ID de comunidad inválido");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const data = await communityProfileService.getCommunityProfile(communityId);
        if (isMounted) setProfile(data);
      } catch (error) {
        if (isMounted) {
          setError("Error al cargar la información de la comunidad");
          console.error("Error fetching community profile:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [communityId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00A693" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se encontró la comunidad.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CommunityProfileCard profile={profile} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default CommunityProfileScreen;