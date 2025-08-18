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
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

interface ActivityCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  backgroundImage: string;
  activeCount: number;
  description: string;
}

export default function Activities() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activityCategories: ActivityCategory[] = [
    {
      id: 'sports',
      title: 'Sportives',
      icon: '🏃‍♂️',
      color: '#FF6B35',
      backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
      activeCount: 12,
      description: 'Course, fitness, tennis, natation...',
    },
    {
      id: 'culture',
      title: 'Culturelles',
      icon: '🎨',
      color: '#9B59B6',
      backgroundImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop',
      activeCount: 8,
      description: 'Musées, théâtre, concerts, expositions...',
    },
    {
      id: 'food',
      title: 'Gastronomie',
      icon: '🍽️',
      color: '#E74C3C',
      backgroundImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop',
      activeCount: 15,
      description: 'Restaurants, cours de cuisine, dégustations...',
    },
    {
      id: 'outdoor',
      title: 'Plein Air',
      icon: '🌲',
      color: '#27AE60',
      backgroundImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop',
      activeCount: 9,
      description: 'Randonnée, pique-nique, jardinage...',
    },
    {
      id: 'nightlife',
      title: 'Vie Nocturne',
      icon: '🌙',
      color: '#8E44AD',
      backgroundImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=200&fit=crop',
      activeCount: 6,
      description: 'Bars, clubs, concerts, soirées...',
    },
    {
      id: 'wellness',
      title: 'Bien-être',
      icon: '🧘‍♀️',
      color: '#1ABC9C',
      backgroundImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop',
      activeCount: 7,
      description: 'Yoga, méditation, spa, massage...',
    },
    {
      id: 'learning',
      title: 'Apprentissage',
      icon: '📚',
      color: '#3498DB',
      backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
      activeCount: 11,
      description: 'Langues, cours, ateliers, formations...',
    },
    {
      id: 'adventure',
      title: 'Aventure',
      icon: '🎢',
      color: '#F39C12',
      backgroundImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop',
      activeCount: 4,
      description: 'Escape game, karting, parachute...',
    }
  ];

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // TODO: Navigate to specific category activities
    console.log(`Navigate to category: ${categoryId}`);
    router.push(`/activities/${categoryId}`);
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
          <Text style={styles.introTitle}>Rencontrez à travers des activités</Text>
          <Text style={styles.introSubtitle}>
            Découvrez de nouvelles personnes en partageant des expériences authentiques et enrichissantes.
          </Text>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Choisissez votre catégorie</Text>
          
          <View style={styles.categoriesGrid}>
            {activityCategories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  index % 2 === 0 ? styles.categoryCardLeft : styles.categoryCardRight
                ]}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.8}
              >
                {/* Background Image */}
                <Image 
                  source={{ uri: category.backgroundImage }} 
                  style={styles.categoryBackground}
                />
                
                {/* Overlay */}
                <View style={[styles.categoryOverlay, { backgroundColor: category.color + '90' }]} />
                
                {/* Content */}
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                  
                  {/* Activity Count Badge */}
                  <View style={styles.activityBadge}>
                    <Text style={styles.activityCount}>{category.activeCount}</Text>
                    <Text style={styles.activityLabel}>activités</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Activities Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Activités populaires</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScroll}
          >
            {[
              {
                title: 'Course du matin',
                organizer: 'Pablo Juan',
                date: '22 février',
                location: 'Chantilly',
                participants: '4 Max • 20-25 ans',
                price: '15€',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'
              },
              {
                title: 'Atelier cuisine',
                organizer: 'Sarah Martin',
                date: '25 février',
                location: 'Paris 15ème',
                participants: '6 Max • 25-35 ans',
                price: '45€',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616c96e1d0b?w=60&h=60&fit=crop&crop=face'
              }
            ].map((activity, index) => (
              <View key={index} style={styles.featuredCard}>
                <Image source={{ uri: activity.image }} style={styles.featuredImage} />
                
                <View style={styles.featuredOverlay}>
                  <Text style={styles.featuredParticipants}>{activity.participants}</Text>
                </View>
                
                <View style={styles.featuredContent}>
                  <View style={styles.featuredHeader}>
                    <Image source={{ uri: activity.avatar }} style={styles.featuredAvatar} />
                    <View style={styles.featuredInfo}>
                      <Text style={styles.featuredTitle}>{activity.title}</Text>
                      <Text style={styles.featuredOrganizer}>{activity.organizer}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.featuredDetails}>
                    <Text style={styles.featuredDate}>{activity.date} • {activity.location}</Text>
                    <Text style={styles.featuredPrice}>{activity.price}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
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
    width: 40, // Balance the back button
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
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  introSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  categoriesContainer: {
    padding: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  categoriesGrid: {
    gap: Spacing.md,
  },
  categoryCard: {
    height: 160,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    position: 'relative',
    width: '100%',
  },
  categoryCardLeft: {
    // Could add specific styling for left cards
  },
  categoryCardRight: {
    // Could add specific styling for right cards
  },
  categoryBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  categoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  categoryContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  categoryTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  categoryDescription: {
    fontSize: FontSizes.sm,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  activityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityCount: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginRight: Spacing.xs,
  },
  activityLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  featuredSection: {
    padding: Spacing.xl,
    backgroundColor: '#F8F9FA',
  },
  featuredScroll: {
    paddingRight: Spacing.xl,
  },
  featuredCard: {
    width: 280,
    marginRight: Spacing.lg,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 140,
  },
  featuredOverlay: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  featuredParticipants: {
    color: '#FFFFFF',
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  featuredContent: {
    padding: Spacing.md,
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featuredAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.sm,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  featuredOrganizer: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  featuredDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredDate: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  featuredPrice: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.secondary,
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