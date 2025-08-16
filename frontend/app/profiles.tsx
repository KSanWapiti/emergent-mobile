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
      style={styles.gridCard}
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
        <View style={styles.headerRight} />
      </View>

      {/* Section Title and View Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {viewType === 'favorites' ? 'Mes favoris' : 'Profils Recommandés'}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {viewType === 'favorites' 
              ? 'Vos favoris sur Tyte!' 
              : 'Filtrez selon vos préférences!'
            }
          </Text>
        </View>
        
        <View style={styles.viewControls}>
          <TouchableOpacity 
            style={[
              styles.viewButton, 
              viewType === 'list' ? styles.viewButtonActive : styles.viewButtonInactive
            ]}
            onPress={() => setViewType('list')}
          >
            <Text style={[
              styles.viewButtonText,
              viewType === 'list' ? styles.viewButtonTextActive : styles.viewButtonTextInactive
            ]}>
              📋 List
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.viewButton, 
              viewType === 'grid' ? styles.viewButtonActive : styles.viewButtonInactive
            ]}
            onPress={() => setViewType('grid')}
          >
            <Text style={[
              styles.viewButtonText,
              viewType === 'grid' ? styles.viewButtonTextActive : styles.viewButtonTextInactive
            ]}>
              🎛 Grid
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.favoriteToggleButton,
              viewType === 'favorites' ? styles.favoriteToggleActive : styles.favoriteToggleInactive
            ]}
            onPress={() => setViewType(viewType === 'favorites' ? 'list' : 'favorites')}
          >
            <Text style={styles.favoriteToggleIcon}>⭐</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profiles Content */}
      <View style={styles.contentContainer}>
        {viewType === 'list' ? (
          <FlatList
            data={filteredProfiles}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <FlatList
            data={filteredProfiles}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
            key={viewType} // Force re-render when switching views
          />
        )}
        
        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
          <Text style={styles.filterIcon}>🎛</Text>
        </TouchableOpacity>
      </View>

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
  headerRight: {
    width: 40,
  },
  controlsContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  sectionHeader: {
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
    gap: Spacing.sm,
  },
  viewButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
  },
  viewButtonActive: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  viewButtonInactive: {
    backgroundColor: 'transparent',
    borderColor: '#E0E0E0',
  },
  viewButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  viewButtonTextActive: {
    color: '#FFFFFF',
  },
  viewButtonTextInactive: {
    color: Colors.text.secondary,
  },
  favoriteToggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  favoriteToggleActive: {
    backgroundColor: Colors.secondary,
  },
  favoriteToggleInactive: {
    backgroundColor: '#E0E0E0',
  },
  favoriteToggleIcon: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  listContainer: {
    padding: Spacing.lg,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  listImageContainer: {
    width: 120,
  },
  listImage: {
    width: '100%',
    height: 160,
  },
  listContent: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  listUsername: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.secondary,
    flex: 1,
  },
  favoriteButton: {
    padding: Spacing.xs,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  favoriteIconActive: {
    color: '#FFD700',
  },
  favoriteIconInactive: {
    color: '#E0E0E0',
  },
  listInfo: {
    marginBottom: Spacing.md,
  },
  listAge: {
    fontSize: FontSizes.sm,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  listHeight: {
    fontSize: FontSizes.sm,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  listBodyType: {
    fontSize: FontSizes.sm,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  listLocation: {
    fontSize: FontSizes.sm,
    color: Colors.text.primary,
  },
  viewProfileButton: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 20,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  viewProfileText: {
    color: Colors.secondary,
    fontWeight: '600',
    fontSize: FontSizes.sm,
  },
  gridContainer: {
    padding: Spacing.lg,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  gridCard: {
    width: (screenWidth - (Spacing.lg * 2) - Spacing.sm) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: 200,
  },
  gridFavoriteButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridFavoriteIcon: {
    fontSize: 16,
  },
  gridContent: {
    padding: Spacing.sm,
  },
  gridUsername: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: Spacing.xs,
  },
  gridAge: {
    fontSize: FontSizes.xs,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  gridHeight: {
    fontSize: FontSizes.xs,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  gridBodyType: {
    fontSize: FontSizes.xs,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  gridLocation: {
    fontSize: FontSizes.xs,
    color: Colors.text.primary,
  },
  filterButton: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.xl,
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginRight: Spacing.sm,
  },
  filterIcon: {
    fontSize: 18,
  },
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