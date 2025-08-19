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
import { router, useLocalSearchParams } from 'expo-router';
import { NavigationHeader } from '../../components/ui/NavigationHeader';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

interface Activity {
  id: string;
  title: string;
  organizer: string;
  organizerLevel: string;
  date: string;
  time: string;
  location: string;
  price: string;
  ageRange: string;
  totalPlaces: number;
  registeredCount: number;
  image: string;
  organizerAvatar: string;
}

export default function CategoryActivities() {
  const { category } = useLocalSearchParams();
  
  const categoryData = {
    sports: {
      title: 'Sportives',
      icon: '🏃‍♂️',
      color: '#FF6B35',
    },
    culture: {
      title: 'Culturelles', 
      icon: '🎨',
      color: '#9B59B6',
    },
    food: {
      title: 'Gastronomie',
      icon: '🍽️', 
      color: '#E74C3C',
    },
    creatives: {
      title: 'Créatives',
      icon: '🎨',
      color: '#E91E63',
    }
  };

  const mockActivities: Activity[] = [
    {
      id: '1',
      title: 'Running',
      organizer: 'Pablo Juan',
      organizerLevel: 'Coach de Running • Débutant',
      date: '22 février',
      time: '16h00 à 18h00',
      location: 'Chantilly, Oise',
      price: '19€',
      ageRange: '20-25 ans',
      totalPlaces: 10,
      registeredCount: 6,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
      organizerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    {
      id: '2',
      title: 'CrossFit',
      organizer: 'Sarah Martin',
      organizerLevel: 'Coach CrossFit • Intermédiaire',
      date: '25 février',
      time: '19h00 à 20h30',
      location: 'Paris 15ème',
      price: '25€',
      ageRange: '25-35 ans',
      totalPlaces: 8,
      registeredCount: 3,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=200&fit=crop',
      organizerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616c96e1d0b?w=60&h=60&fit=crop&crop=face',
    },
    {
      id: '3',
      title: 'Atelier de Peinture',
      organizer: 'Marie Dubois',
      organizerLevel: 'Artiste Peintre • Tous niveaux',
      date: '28 février',
      time: '14h00 à 16h30',
      location: 'Montmartre, Paris',
      price: '35€',
      ageRange: '18-50 ans',
      totalPlaces: 12,
      registeredCount: 8,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop',
      organizerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    {
      id: '4',
      title: 'Visite Guidée Musée',
      organizer: 'Pierre Martin',
      organizerLevel: 'Guide Culturel • Expert',
      date: '02 mars',
      time: '10h00 à 12h00',
      location: 'Musée du Louvre',
      price: '15€',
      ageRange: '22-40 ans',
      totalPlaces: 15,
      registeredCount: 11,
      image: 'https://images.unsplash.com/photo-1566127444979-b3d2b3d7ad1a?w=400&h=200&fit=crop',
      organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
    },
    {
      id: '5',
      title: 'Photographie Mobile',
      organizer: 'Lisa Chen',
      organizerLevel: 'Photographe Pro • Débutant',
      date: '05 mars',
      time: '15h00 à 17h00',
      location: 'Quartier Latin',
      price: '28€',
      ageRange: '20-35 ans',
      totalPlaces: 6,
      registeredCount: 4,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=200&fit=crop',
      organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face',
    },
    {
      id: '6',
      title: 'Création de Bijoux',
      organizer: 'Emma Robert',
      organizerLevel: 'Bijoutière • Créatif',
      date: '08 mars',
      time: '13h00 à 16h00',
      location: 'Atelier Bastille',
      price: '45€',
      ageRange: '25-45 ans',
      totalPlaces: 8,
      registeredCount: 2,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=200&fit=crop',
      organizerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face',
    },
  ];

  // Filter activities based on category
  const getActivitiesForCategory = () => {
    switch(category) {
      case 'sports':
        return mockActivities.filter(activity => ['Running', 'CrossFit'].includes(activity.title));
      case 'culture':
        return mockActivities.filter(activity => ['Atelier de Peinture', 'Visite Guidée Musée'].includes(activity.title));
      case 'creatives':
        return mockActivities.filter(activity => ['Photographie Mobile', 'Création de Bijoux'].includes(activity.title));
      default:
        return mockActivities;
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData] || { title: 'Activités', icon: '🎯', color: Colors.secondary };
  const activities = getActivitiesForCategory();

  const handleActivityPress = (activityId: string) => {
    router.push(`/activities/${category}/${activityId}`);
  };

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader showMenu={true} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activités</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Choisis par catégorie ce qui te plaît le plus!</Text>
        </View>

        {/* Category Section */}
        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryIcon}>{currentCategory.icon}</Text>
              <Text style={styles.categoryTitle}>{currentCategory.title}</Text>
            </View>
            <TouchableOpacity style={styles.completeListButton}>
              <Text style={styles.completeListText}>Liste complète →</Text>
            </TouchableOpacity>
          </View>

          {/* Activities Grid */}
          <View style={styles.activitiesGrid}>
            {activities.map((activity, index) => (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.activityCard,
                  index % 2 === 0 ? styles.activityCardLeft : styles.activityCardRight
                ]}
                onPress={() => handleActivityPress(activity.id)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: activity.image }} style={styles.activityImage} />
                
                {/* Activity Info Overlay */}
                <View style={styles.activityOverlay}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                </View>

                {/* Bottom Info */}
                <View style={styles.activityBottom}>
                  <View style={styles.organizerInfo}>
                    <Image source={{ uri: activity.organizerAvatar }} style={styles.organizerAvatar} />
                    <View style={styles.organizerDetails}>
                      <Text style={styles.organizerName}>{activity.organizer}</Text>
                      <Text style={styles.activityDate}>{activity.date}</Text>
                    </View>
                  </View>
                  <Text style={styles.activityPrice}>{activity.price}</Text>
                </View>

                {/* Places Info */}
                <View style={styles.placesInfo}>
                  <Text style={styles.placesText}>
                    {activity.registeredCount}/{activity.totalPlaces} inscrits
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

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
          style={styles.navItem} 
          onPress={() => handleNavigation('/profiles')}
        >
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navLabel}>Profils</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, styles.navItemActive]} 
          onPress={() => handleNavigation('/activities')}
        >
          <Text style={[styles.navIcon, styles.navIconActive]}>👥</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Activités</Text>
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
  scrollView: {
    flex: 1,
  },
  introSection: {
    padding: Spacing.xl,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  introTitle: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  categorySection: {
    padding: Spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  categoryTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  completeListButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  completeListText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: (screenWidth - 48) / 2 - 8,
    marginBottom: Spacing.lg,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityCardLeft: {
    marginRight: Spacing.sm,
  },
  activityCardRight: {
    marginLeft: Spacing.sm,
  },
  activityImage: {
    width: '100%',
    height: 120,
  },
  activityOverlay: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  activityTitle: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityBottom: {
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  organizerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: Spacing.sm,
  },
  organizerDetails: {
    flex: 1,
  },
  organizerName: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  activityDate: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
  },
  activityPrice: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  placesInfo: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  placesText: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
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