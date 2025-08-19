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
import { router } from 'expo-router';
import { Button } from '../components/ui/Button';
import { NavigationHeader } from '../components/ui/NavigationHeader';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

export default function Profile() {
  const mockUserData = {
    username: '@RaphaelAreas',
    location: 'Chantilly, Oise',
    age: '34 Ans',
    height: '1m65',
    bodyType: 'Athlétique',
    profileImages: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    ],
    details: {
      ethnicType: 'Latino-américain',
      religion: 'Catholique',
      education: '?????????????',
      hairColor: 'Brun Court',
      smoker: 'Non-fumeur',
      socialCategory: 'Designer',
      languages: 'Anglais, Portugais',
      hobbies: 'Jeux en ligne, Randonnée, Lecture',
      presentation: 'Designer brésilien vivant en France. Passionné par les jeux vidéo, la nature et les échanges culturels. Toujours à la recherche de nouvelles inspirations créatives et de rencontres authentiques.',
    },
    hasVideo: true,
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader showMenu={true} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header Section */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImagesContainer}>
            {/* Background Images */}
            <View style={styles.backgroundImages}>
              {mockUserData.profileImages.map((uri, index) => (
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
                source={{ uri: mockUserData.profileImages[0] }} 
                style={styles.mainProfileImage} 
              />
            </View>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{mockUserData.username}</Text>
            <View style={styles.basicInfo}>
              <Text style={styles.infoText}>📍 {mockUserData.location}</Text>
              <Text style={styles.infoText}>🎂 {mockUserData.age}</Text>
              <Text style={styles.infoText}>📏 {mockUserData.height}</Text>
              <Text style={styles.infoText}>💪 {mockUserData.bodyType}</Text>
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>À propos de moi</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push('/edit-profile')}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.detailsContainer}>
            {/* Left Column */}
            <View style={styles.detailsColumn}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type ethnique:</Text>
                <Text style={styles.detailValue}>{mockUserData.details.ethnicType}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Religion:</Text>
                <Text style={styles.detailValue}>{mockUserData.details.religion}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Instruction:</Text>
                <Text style={styles.detailValue}>{mockUserData.details.education}</Text>
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.detailsColumn}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Cheveux:</Text>
                <Text style={styles.detailValue}>{mockUserData.details.hairColor}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Fumeur:</Text>
                <Text style={styles.detailValue}>{mockUserData.details.smoker}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Catégorie CSP:</Text>
                <Text style={styles.detailValue}>{mockUserData.details.socialCategory}</Text>
              </View>
            </View>
          </View>

          {/* Full Width Details */}
          <View style={styles.fullWidthDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Langues parlées</Text>
              <Text style={styles.detailValue}>{mockUserData.details.languages}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Loisirs</Text>
              <Text style={styles.detailValue}>{mockUserData.details.hobbies}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Présentation libre</Text>
              <Text style={styles.presentationText}>{mockUserData.details.presentation}</Text>
            </View>
          </View>
        </View>

        {/* Video Section */}
        {mockUserData.hasVideo && (
          <View style={styles.videoSection}>
            <Text style={styles.sectionTitle}>En vidéo</Text>
            <View style={styles.videoContainer}>
              <Image 
                source={{ uri: mockUserData.profileImages[0] }} 
                style={styles.videoThumbnail} 
              />
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playIcon}>▶️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <BottomNavigation activeTab="profile" />
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
});