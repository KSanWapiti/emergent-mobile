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
import { Button } from '../../../components/ui/Button';
import { NavigationHeader } from '../../../components/ui/NavigationHeader';
import { Colors, FontSizes, Spacing } from '../../../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

export default function ActivityDetail() {
  const { category, activityId } = useLocalSearchParams();
  
  // Mock activity data
  const activityData = {
    id: activityId,
    title: 'Coach de Running',
    level: 'Débutant',
    description: 'Technique, respiration et objectifs accessibles',
    organizer: {
      name: 'Pablo Juan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      title: 'Coach de Running',
      level: 'Débutant',
    },
    details: {
      date: 'Le 22 février',
      time: '16h00 à 18h00',
      location: 'Chantilly, Oise',
      ageRange: '20-25 ans',
      price: '19€ par personne',
      totalPlaces: 10,
      registeredCount: 6,
    },
    fullDescription: 'Séance de renforcement musculaire personnalisée avec un coach certifié. Idéale pour tonifier le corps, améliorer la posture et augmenter l\'endurance. Adaptée à tous les niveaux.',
    notes: [
      'Prévoir une bouteille d\'eau et une serviette',
      'Tenue sportive obligatoire',
      'Arriver 10 minutes à l\'avance',
    ],
    backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    registeredUsers: [
      'https://images.unsplash.com/photo-1494790108755-2616c96e1d0b?w=60&h=60&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    ],
  };

  const handleJoinActivity = () => {
    // TODO: Implement join activity logic
    console.log(`Joining activity ${activityId}`);
  };

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const remainingPlaces = activityData.details.totalPlaces - activityData.details.registeredCount;

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader showMenu={true} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* Background Image */}
          <Image source={{ uri: activityData.backgroundImage }} style={styles.backgroundImage} />
          
          {/* Overlay */}
          <View style={styles.heroOverlay} />
          
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          {/* Hero Content */}
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{activityData.description}</Text>
          </View>

          {/* Organizer Card */}
          <View style={styles.organizerCard}>
            <Image source={{ uri: activityData.organizer.avatar }} style={styles.organizerAvatar} />
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerName}>{activityData.organizer.name}</Text>
              <Text style={styles.organizerTitle}>{activityData.organizer.title}</Text>
              <Text style={styles.organizerLevel}>{activityData.organizer.level}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Text style={styles.favoriteIcon}>⭐</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Activity Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Infos activité</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>📅</Text>
                <Text style={styles.infoText}>{activityData.details.date} de {activityData.details.time}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoText}>{activityData.details.location}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>🎂</Text>
                <Text style={styles.infoText}>{activityData.details.ageRange}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>💰</Text>
                <Text style={styles.infoText}>{activityData.details.price}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>👥</Text>
                <Text style={styles.infoText}>
                  {activityData.details.totalPlaces} places / {activityData.details.registeredCount} inscrits / reste {remainingPlaces} places
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description de l'activité</Text>
          <Text style={styles.descriptionText}>{activityData.fullDescription}</Text>
        </View>

        {/* Notes Section */}
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>À noter</Text>
          {activityData.notes.map((note, index) => (
            <View key={index} style={styles.noteItem}>
              <Text style={styles.noteBullet}>•</Text>
              <Text style={styles.noteText}>{note}</Text>
            </View>
          ))}
        </View>

        {/* Registered Users Section */}
        <View style={styles.registeredSection}>
          <Text style={styles.sectionTitle}>Ils sont déjà inscrits</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.registeredUsers}
          >
            {activityData.registeredUsers.slice(0, activityData.details.registeredCount).map((userAvatar, index) => (
              <Image 
                key={index} 
                source={{ uri: userAvatar }} 
                style={styles.registeredUserAvatar} 
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <Button
          title={`S'inscrire (${remainingPlaces} places restantes)`}
          onPress={handleJoinActivity}
          gradient={true}
          size="large"
          style={styles.joinButton}
          disabled={remainingPlaces === 0}
        />
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
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 300,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backButton: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
  heroContent: {
    position: 'absolute',
    top: '35%',
    left: Spacing.lg,
    right: Spacing.lg,
  },
  heroTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  organizerCard: {
    position: 'absolute',
    bottom: -30,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  organizerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  organizerTitle: {
    fontSize: FontSizes.md,
    color: Colors.secondary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  organizerLevel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  favoriteButton: {
    padding: Spacing.sm,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  infoSection: {
    padding: Spacing.lg,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: Spacing.lg,
  },
  infoGrid: {
    gap: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.md,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: Spacing.sm,
    width: 24,
  },
  infoText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    flex: 1,
  },
  descriptionSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  descriptionText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  notesSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  noteBullet: {
    fontSize: FontSizes.md,
    color: Colors.secondary,
    fontWeight: 'bold',
    marginRight: Spacing.sm,
    width: 12,
  },
  noteText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    flex: 1,
  },
  registeredSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  registeredUsers: {
    paddingRight: Spacing.lg,
  },
  registeredUserAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Spacing.md,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  bottomAction: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  joinButton: {
    marginBottom: 0,
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