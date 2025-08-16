import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { NavigationHeader } from '../components/ui/NavigationHeader';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

interface UserProfile {
  id: string;
  username: string;
  age: number;
  height: string;
  bodyType: string;
  city: string;
  profileImage: string;
  isFavorite: boolean;
}

export default function Profiles() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [profiles, setProfiles] = useState<UserProfile[]>([
    {
      id: '1',
      username: '@BrunaMachado',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Paris',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616c96e1d0b?w=400&h=500&fit=crop&crop=face',
      isFavorite: false,
    },
    {
      id: '2',
      username: '@MarcelleSilva',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Lyon',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face',
      isFavorite: false,
    },
    {
      id: '3',
      username: '@MonicaLourh',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Marseille',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face',
      isFavorite: false,
    },
    {
      id: '4',
      username: '@BellaRouge',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Bordeaux',
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face',
      isFavorite: false,
    },
    {
      id: '5',
      username: '@SophiaLane',
      age: 28,
      height: '1,75 m',
      bodyType: 'Mince',
      city: 'Nice',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
      isFavorite: false,
    },
    {
      id: '6',
      username: '@CamilleRose',
      age: 29,
      height: '1,68 m',
      bodyType: 'Normal',
      city: 'Toulouse',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (profileId: string) => {
    setProfiles(prevProfiles =>
      prevProfiles.map(profile =>
        profile.id === profileId
          ? { ...profile, isFavorite: !profile.isFavorite }
          : profile
      )
    );
  };

  const handleViewProfile = (profileId: string) => {
    // TODO: Navigate to profile detail
    console.log(`View profile: ${profileId}`);
    router.push(`/profile/${profileId}`);
  };

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const renderListView = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.profilesList}>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.listProfileCard}>
            <Image source={{ uri: profile.profileImage }} style={styles.listProfileImage} />
            
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(profile.id)}
            >
              <Text style={[
                styles.favoriteIcon,
                profile.isFavorite && styles.favoriteIconActive
              ]}>
                {profile.isFavorite ? '⭐' : '☆'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.listProfileInfo}>
              <Text style={styles.listProfileUsername}>{profile.username}</Text>
              
              <View style={styles.listProfileDetails}>
                <View style={styles.listDetailItem}>
                  <Text style={styles.listDetailIcon}>🎂</Text>
                  <Text style={styles.listDetailText}>{profile.age} Ans</Text>
                </View>
                
                <View style={styles.listDetailItem}>
                  <Text style={styles.listDetailIcon}>📏</Text>
                  <Text style={styles.listDetailText}>{profile.height}</Text>
                </View>
                
                <View style={styles.listDetailItem}>
                  <Text style={styles.listDetailIcon}>💪</Text>
                  <Text style={styles.listDetailText}>{profile.bodyType}</Text>
                </View>
                
                <View style={styles.listDetailItem}>
                  <Text style={styles.listDetailIcon}>💖</Text>
                  <Text style={styles.listDetailText}>{profile.city}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.viewProfileButton}
                onPress={() => handleViewProfile(profile.id)}
              >
                <Text style={styles.viewProfileButtonText}>Voir le profil</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderGridView = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.profilesGrid}>
        {profiles.map((profile) => (
          <TouchableOpacity 
            key={profile.id} 
            style={styles.gridProfileCard}
            onPress={() => handleViewProfile(profile.id)}
          >
            <Image source={{ uri: profile.profileImage }} style={styles.gridProfileImage} />
            
            <TouchableOpacity 
              style={styles.gridFavoriteButton}
              onPress={() => toggleFavorite(profile.id)}
            >
              <Text style={[
                styles.favoriteIcon,
                profile.isFavorite && styles.favoriteIconActive
              ]}>
                {profile.isFavorite ? '⭐' : '☆'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.gridProfileInfo}>
              <Text style={styles.gridProfileUsername}>{profile.username}</Text>
              
              <View style={styles.gridProfileDetails}>
                <Text style={styles.gridDetailText}>🎂 {profile.age} Ans</Text>
                <Text style={styles.gridDetailText}>📏 {profile.height}</Text>
              </View>
              
              <View style={styles.gridProfileDetails}>
                <Text style={styles.gridDetailText}>💪 {profile.bodyType}</Text>
                <Text style={styles.gridDetailText}>💖 {profile.city}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader showMenu={true} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profils</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>🔧</Text>
        </TouchableOpacity>
      </View>

      {/* Section Title and Controls */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Profils Recommandés</Text>
          <Text style={styles.sectionSubtitle}>Filtrez selon vos préférences!</Text>
        </View>
        
        <View style={styles.viewControls}>
          <TouchableOpacity 
            style={[
              styles.viewButton,
              viewMode === 'list' && styles.viewButtonActive
            ]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[
              styles.viewButtonText,
              viewMode === 'list' && styles.viewButtonTextActive
            ]}>📋 List</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.viewButton,
              viewMode === 'grid' && styles.viewButtonActive
            ]}
            onPress={() => setViewMode('grid')}
          >
            <Text style={[
              styles.viewButtonText,
              viewMode === 'grid' && styles.viewButtonTextActive
            ]}>⊞ Grid</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shuffleButton}>
            <Text style={styles.shuffleIcon}>🔀</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Button */}
      <View style={styles.filterSection}>
        <TouchableOpacity style={styles.filterMainButton}>
          <Text style={styles.filterText}>🔽 Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {viewMode === 'list' ? renderListView() : renderGridView()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => handleNavigation('/messages')}
        >
          <Text style={styles.navIcon}>💬</Text>
          <Text style={styles.navLabel}>Messages</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, styles.navItemActive]} 
          onPress={() => handleNavigation('/profiles')}
        >
          <Text style={[styles.navIcon, styles.navIconActive]}>🔍</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Profils</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => handleNavigation('/activities')}
        >
          <Text style={styles.navIcon}>👥</Text>
          <Text style={styles.navLabel}>Activités</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => handleNavigation('/profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Mon Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: Spacing.sm,
  },
  backArrow: {
    fontSize: 24,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  filterButton: {
    padding: Spacing.sm,
  },
  filterIcon: {
    fontSize: 20,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#F8F9FA',
  },
  sectionTitleContainer: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
  },
  viewControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    marginLeft: Spacing.sm,
  },
  viewButtonActive: {
    backgroundColor: Colors.secondary,
  },
  viewButtonText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  viewButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  shuffleButton: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  shuffleIcon: {
    fontSize: 18,
  },
  filterSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    alignItems: 'flex-end',
  },
  filterMainButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  filterText: {
    fontSize: FontSizes.md,
    color: Colors.secondary,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  
  // List View Styles
  profilesList: {
    padding: Spacing.lg,
  },
  listProfileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  listProfileImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 24,
  },
  favoriteIconActive: {
    color: '#FFD700',
  },
  listProfileInfo: {
    padding: Spacing.md,
  },
  listProfileUsername: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: Spacing.sm,
  },
  listProfileDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.md,
  },
  listDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: Spacing.xs,
  },
  listDetailIcon: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },
  listDetailText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
  },
  viewProfileButton: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 25,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  viewProfileButtonText: {
    fontSize: FontSizes.md,
    color: Colors.secondary,
    fontWeight: '600',
  },

  // Grid View Styles
  profilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  gridProfileCard: {
    width: (screenWidth - 48) / 2 - 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  gridProfileImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  gridFavoriteButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridProfileInfo: {
    padding: Spacing.md,
  },
  gridProfileUsername: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: Spacing.sm,
  },
  gridProfileDetails: {
    marginBottom: Spacing.xs,
  },
  gridDetailText: {
    fontSize: FontSizes.sm,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },

  // Bottom Navigation
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  navItemActive: {
    backgroundColor: Colors.secondary + '10',
    borderRadius: 10,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  navIconActive: {
    color: Colors.secondary,
  },
  navLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  navLabelActive: {
    color: Colors.secondary,
    fontWeight: '600',
  },
});