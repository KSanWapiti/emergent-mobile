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
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { NavigationHeader } from '../components/ui/NavigationHeader';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

interface Profile {
  id: string;
  username: string;
  name: string;
  age: number;
  height: string;
  bodyType: string;
  city: string;
  image: string;
  isFavorite: boolean;
  interests: string[];
  distance?: string;
}

type ViewType = 'list' | 'grid' | 'favorites';

export default function Profiles() {
  const [viewType, setViewType] = useState<ViewType>('list');
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      username: '@RenaBlu',
      name: 'Rena',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Paris',
      image: 'https://images.unsplash.com/photo-1697551458746-b86ccf5049d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXRzfGVufDB8fHx8MTc1NTMzMTI3NHww&ixlib=rb-4.1.0&q=85',
      isFavorite: true,
      interests: ['Sport', 'Voyage', 'Cuisine'],
      distance: '2 km'
    },
    {
      id: '2',
      username: '@JoannaK',
      name: 'Joanna',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Paris',
      image: 'https://images.unsplash.com/photo-1688802928956-fa8139142c04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFkdWx0cyUyMHBvcnRyYWl0c3xlbnwwfHx8fDE3NTUzMzEyNzl8MA&ixlib=rb-4.1.0&q=85',
      isFavorite: true,
      interests: ['Art', 'Musique', 'Danse'],
      distance: '5 km'
    },
    {
      id: '3',
      username: '@MariahDoha',
      name: 'Mariah',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Paris',
      image: 'https://images.unsplash.com/photo-1682074441410-8435f068ca95?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHx5b3VuZyUyMGFkdWx0cyUyMHBvcnRyYWl0c3xlbnwwfHx8fDE3NTUzMzEyNzl8MA&ixlib=rb-4.1.0&q=85',
      isFavorite: true,
      interests: ['Lecture', 'Voyage', 'Fitness'],
      distance: '8 km'
    },
    {
      id: '4',
      username: '@BrunaMachado',
      name: 'Bruna',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Paris',
      image: 'https://images.unsplash.com/photo-1679466061812-211a6b737175?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXRzfGVufDB8fHx8MTc1NTMzMTI3NHww&ixlib=rb-4.1.0&q=85',
      isFavorite: false,
      interests: ['Photographie', 'Nature', 'Café'],
      distance: '3 km'
    },
    {
      id: '5',
      username: '@MarcelleSilva',
      name: 'Marcelle',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Lyon',
      image: 'https://images.unsplash.com/photo-1691510112583-0dac7bbe460f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHx5b3VuZyUyMGFkdWx0cyUyMHBvcnRyYWl0c3xlbnwwfHx8fDE3NTUzMzEyNzl8MA&ixlib=rb-4.1.0&q=85',
      isFavorite: false,
      interests: ['Mode', 'Cinéma', 'Restaurant'],
      distance: '12 km'
    },
    {
      id: '6',
      username: '@MonicaLourh',
      name: 'Monica',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Marseille',
      image: 'https://images.unsplash.com/photo-1610104687526-e2d1d5f8e9ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHx5b3VuZyUyMGFkdWx0cyUyMHBvcnRyYWl0c3xlbnwwfHx8fDE3NTUzMzEyNzl8MA&ixlib=rb-4.1.0&q=85',
      isFavorite: false,
      interests: ['Yoga', 'Méditation', 'Plage'],
      distance: '15 km'
    },
    {
      id: '7',
      username: '@BellaRouge',
      name: 'Bella',
      age: 31,
      height: '1,80 m',
      bodyType: 'Athlétique',
      city: 'Bordeaux',
      image: 'https://images.pexels.com/photos/2513393/pexels-photo-2513393.jpeg',
      isFavorite: false,
      interests: ['Vin', 'Gastronomie', 'Histoire'],
      distance: '20 km'
    },
    {
      id: '8',
      username: '@SofiaLuna',
      name: 'Sofia',
      age: 28,
      height: '1,70 m',
      bodyType: 'Mince',
      city: 'Nice',
      image: 'https://images.pexels.com/photos/3851554/pexels-photo-3851554.jpeg',
      isFavorite: false,
      interests: ['Plongée', 'Surf', 'Plage'],
      distance: '25 km'
    }
  ]);

  const handleFavoriteToggle = (profileId: string) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === profileId 
        ? { ...profile, isFavorite: !profile.isFavorite }
        : profile
    ));
  };

  const handleViewProfile = (profileId: string) => {
    // TODO: Navigate to detailed profile view
    console.log(`View profile: ${profileId}`);
  };

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const filteredProfiles = viewType === 'favorites' 
    ? profiles.filter(profile => profile.isFavorite)
    : profiles;

  const renderListItem = ({ item: profile }: { item: Profile }) => (
    <View style={styles.listCard}>
      <TouchableOpacity 
        style={styles.listImageContainer}
        onPress={() => handleViewProfile(profile.id)}
      >
        <Image source={{ uri: profile.image }} style={styles.listImage} />
      </TouchableOpacity>
      
      <View style={styles.listContent}>
        <View style={styles.listHeader}>
          <Text style={styles.listUsername}>{profile.username}</Text>
          <TouchableOpacity 
            onPress={() => handleFavoriteToggle(profile.id)}
            style={styles.favoriteButton}
          >
            <Text style={[
              styles.favoriteIcon, 
              profile.isFavorite ? styles.favoriteIconActive : styles.favoriteIconInactive
            ]}>
              ⭐
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.listInfo}>
          <Text style={styles.listAge}>🎂 {profile.age} Ans</Text>
          <Text style={styles.listHeight}>📏 {profile.height}</Text>
          <Text style={styles.listBodyType}>💪 {profile.bodyType}</Text>
          <Text style={styles.listLocation}>📍 {profile.city}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.viewProfileButton}
          onPress={() => handleViewProfile(profile.id)}
        >
          <Text style={styles.viewProfileText}>Voir le profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGridItem = ({ item: profile, index }: { item: Profile; index: number }) => (
    <TouchableOpacity 
      style={[styles.gridCard, { marginLeft: index % 2 === 0 ? 0 : Spacing.sm }]}
      onPress={() => handleViewProfile(profile.id)}
    >
      <Image source={{ uri: profile.image }} style={styles.gridImage} />
      
      <TouchableOpacity 
        style={styles.gridFavoriteButton}
        onPress={() => handleFavoriteToggle(profile.id)}
      >
        <Text style={[
          styles.gridFavoriteIcon, 
          profile.isFavorite ? styles.favoriteIconActive : styles.favoriteIconInactive
        ]}>
          ⭐
        </Text>
      </TouchableOpacity>
      
      <View style={styles.gridContent}>
        <Text style={styles.gridUsername}>{profile.username}</Text>
        <Text style={styles.gridAge}>🎂 {profile.age} Ans</Text>
        <Text style={styles.gridHeight}>📏 {profile.height}</Text>
        <Text style={styles.gridBodyType}>💪 {profile.bodyType}</Text>
        <Text style={styles.gridLocation}>📍 {profile.city}</Text>
      </View>
    </TouchableOpacity>
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