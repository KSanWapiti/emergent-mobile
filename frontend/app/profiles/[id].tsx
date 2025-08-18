import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { NavigationHeader } from '../../components/ui/NavigationHeader';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

// Mock data for different profiles - in real app, this would come from API
const profilesData = {
  '1': {
    username: '@RenaBlu',
    name: 'Rena',
    location: 'Paris, France',
    age: '31 Ans',
    height: '1,80 m',
    bodyType: 'Athlétique',
    profileImages: [
      'https://images.unsplash.com/photo-1697551458746-b86ccf5049d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXRzfGVufDB8fHx8MTc1NTMzMTI3NHww&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    ],
    details: {
      ethnicType: 'Afro-américaine',
      religion: 'Catholique',
      education: 'Master en Commerce',
      hairColor: 'Noir Court',
      smoker: 'Non-fumeur',
      socialCategory: 'Manager',
      languages: 'Français, Anglais',
      hobbies: 'Sport, Voyage, Cuisine',
      presentation: 'Passionnée de sport et de voyages, je cherche quelqu\'un avec qui partager de belles aventures. J\'adore découvrir de nouvelles cultures et cuisines du monde.',
    },
    hasVideo: true,
  },
  '2': {
    username: '@JoannaK',
    name: 'Joanna',
    location: 'Paris, France',
    age: '31 Ans',
    height: '1,80 m',
    bodyType: 'Athlétique',
    profileImages: [
      'https://images.unsplash.com/photo-1688802928956-fa8139142c04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFkdWx0cyUyMHBvcnRyYWl0c3xlbnwwfHx8fDE3NTUzMzEyNzl8MA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1494790108755-2616c96e1d0b?w=400&h=400&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    ],
    details: {
      ethnicType: 'Européenne',
      religion: 'Agnostique',
      education: 'École d\'Art',
      hairColor: 'Châtain Long',
      smoker: 'Non-fumeur',
      socialCategory: 'Artiste',
      languages: 'Français, Espagnol, Italien',
      hobbies: 'Art, Musique, Danse',
      presentation: 'Artiste passionnée, je vis pour la création et l\'expression artistique. J\'aime les soirées culturelles, les expositions et les concerts. Recherche quelqu\'un qui apprécie l\'art autant que moi.',
    },
    hasVideo: false,
  },
  '3': {
    username: '@MariahDoha',
    name: 'Mariah',
    location: 'Paris, France',
    age: '31 Ans',
    height: '1,80 m',
    bodyType: 'Athlétique',
    profileImages: [
      'https://images.unsplash.com/photo-1682074441410-8435f068ca95?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHx5b3VuZyUyMGFkdWx0cyUyMHBvcnRyYWl0c3xlbnwwfHx8fDE3NTUzMzEyNzl8MA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    ],
    details: {
      ethnicType: 'Afro-américaine',
      religion: 'Protestante',
      education: 'Université de Lettres',
      hairColor: 'Noir Tressé',
      smoker: 'Non-fumeur',
      socialCategory: 'Écrivaine',
      languages: 'Français, Anglais, Arabe',
      hobbies: 'Lecture, Voyage, Fitness',
      presentation: 'Passionnée de littérature et de fitness, je partage mon temps entre l\'écriture et la salle de sport. J\'adore voyager et découvrir de nouvelles perspectives sur la vie.',
    },
    hasVideo: true,
  },
  '4': {
    username: '@BrunaMachado',
    name: 'Bruna',
    location: 'Paris, France',
    age: '31 Ans',
    height: '1,80 m',
    bodyType: 'Athlétique',
    profileImages: [
      'https://images.unsplash.com/photo-1679466061812-211a6b737175?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXRzfGVufDB8fHx8MTc1NTMzMTI3NHww&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    ],
    details: {
      ethnicType: 'Latino-américaine',
      religion: 'Catholique',
      education: 'École de Photographie',
      hairColor: 'Brun Long',
      smoker: 'Non-fumeur',
      socialCategory: 'Photographe',
      languages: 'Français, Portugais, Anglais',
      hobbies: 'Photographie, Nature, Café',
      presentation: 'Photographe professionnelle brésilienne installée en France. J\'aime capturer les moments authentiques de la vie et partager un bon café en découvrant Paris.',
    },
    hasVideo: false,
  },
  '5': {
    username: '@MarcelleSilva',
    name: 'Marcelle',
    location: 'Lyon, France',
    age: '31 Ans',
    height: '1,80 m',
    bodyType: 'Athlétique',
    profileImages: [
      'https://images.unsplash.com/photo-1691510112583-0dac7bbe460f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHx5b3VuZyUyMGFkdWx0cyUyMHBvcnRyYWl0c3xlbnwwfHx8fDE3NTUzMzEyNzl8MA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616c96e1d0b?w=400&h=400&fit=crop&crop=face',
    ],
    details: {
      ethnicType: 'Européenne',
      religion: 'Agnostique',
      education: 'École de Mode',
      hairColor: 'Blond Long',
      smoker: 'Non-fumeur',
      socialCategory: 'Styliste',
      languages: 'Français, Anglais, Allemand',
      hobbies: 'Mode, Cinéma, Restaurant',
      presentation: 'Styliste passionnée basée à Lyon. J\'adore le cinéma d\'auteur et découvrir de nouveaux restaurants. Toujours à la recherche de belles expériences à partager.',
    },
    hasVideo: true,
  },
};

export default function ProfileDetail() {
  const { id } = useLocalSearchParams();
  
  // Get profile data or fallback to default
  const profileData = profilesData[id as string] || profilesData['1'];

  const handleNavigation = (route: string) => {
    console.log(`Navigate to: ${route}`);
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader showMenu={true} />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header Section */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImagesContainer}>
            {/* Background Images */}
            <View style={styles.backgroundImages}>
              {profileData.profileImages.map((uri, index) => (
                <Image 
                  key={index} 
                  source={{ uri }} 
                  style={[styles.backgroundImage, { left: index * 60 }]} 
                />
              ))}
            </View>
            
            {/* Main Profile Image */}
            <View style={styles.mainProfileContainer}>
              <Image 
                source={{ uri: profileData.profileImages[0] }} 
                style={styles.mainProfileImage} 
              />
            </View>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{profileData.username}</Text>
            <View style={styles.basicInfo}>
              <Text style={styles.infoText}>📍 {profileData.location}</Text>
              <Text style={styles.infoText}>🎂 {profileData.age}</Text>
              <Text style={styles.infoText}>📏 {profileData.height}</Text>
              <Text style={styles.infoText}>💪 {profileData.bodyType}</Text>
            </View>

            {/* Star Rating */}
            <TouchableOpacity style={styles.starButton}>
              <Text style={styles.starIcon}>⭐</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.invitationButton}>
              <Text style={styles.invitationText}>Invitation 💌</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageText}>Message 💬</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.likeButton}>
              <Text style={styles.likeText}>Like 💖</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Me Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>À propos de moi</Text>
          
          <View style={styles.detailsContainer}>
            {/* Left Column */}
            <View style={styles.detailsColumn}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type ethnique:</Text>
                <Text style={styles.detailValue}>{profileData.details.ethnicType}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Religion:</Text>
                <Text style={styles.detailValue}>{profileData.details.religion}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Instruction:</Text>
                <Text style={styles.detailValue}>{profileData.details.education}</Text>
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.detailsColumn}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Cheveux:</Text>
                <Text style={styles.detailValue}>{profileData.details.hairColor}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Fumeur:</Text>
                <Text style={styles.detailValue}>{profileData.details.smoker}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Catégorie CSP:</Text>
                <Text style={styles.detailValue}>{profileData.details.socialCategory}</Text>
              </View>
            </View>
          </View>

          {/* Full Width Details */}
          <View style={styles.fullWidthDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Langues parlées</Text>
              <Text style={styles.detailValue}>{profileData.details.languages}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Loisirs</Text>
              <Text style={styles.detailValue}>{profileData.details.hobbies}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Présentation libre</Text>
              <Text style={styles.presentationText}>{profileData.details.presentation}</Text>
            </View>
          </View>
        </View>

        {/* Video Section */}
        {profileData.hasVideo && (
          <View style={styles.videoSection}>
            <Text style={styles.sectionTitle}>En vidéo</Text>
            <View style={styles.videoContainer}>
              <Image 
                source={{ uri: profileData.profileImages[0] }} 
                style={styles.videoThumbnail} 
              />
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playIcon}>▶️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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

// Réutilisation exacte des styles de la page Mon profil
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
  profileHeader: {
    padding: Spacing.lg,
    backgroundColor: '#F8F9FA',
  },
  profileImagesContainer: {
    height: 200,
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  backgroundImages: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: 120,
    height: 160,
    borderRadius: 20,
    opacity: 0.3,
  },
  mainProfileContainer: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.lg,
  },
  mainProfileImage: {
    width: 150,
    height: 180,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    marginLeft: 180,
    flex: 1,
  },
  username: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: Spacing.sm,
  },
  basicInfo: {
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  starButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: Spacing.sm,
  },
  starIcon: {
    fontSize: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  invitationButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 25,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  invitationText: {
    color: Colors.secondary,
    fontWeight: '600',
    fontSize: FontSizes.md,
  },
  messageButton: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  messageText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: FontSizes.md,
  },
  likeButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 25,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  likeText: {
    color: Colors.secondary,
    fontWeight: '600',
    fontSize: FontSizes.md,
  },
  aboutSection: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  detailsColumn: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  detailItem: {
    marginBottom: Spacing.md,
  },
  detailLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  detailValue: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
  },
  fullWidthDetails: {
    marginTop: Spacing.lg,
  },
  presentationText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    lineHeight: 22,
    textAlign: 'justify',
  },
  videoSection: {
    padding: Spacing.lg,
  },
  videoContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 20,
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