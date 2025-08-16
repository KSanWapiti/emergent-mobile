import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Button } from '../components/ui/Button';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Sample profile images (using placeholder images)
const profileImages = [
  { id: 1, uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', style: { top: 80, left: 20 } },
  { id: 2, uri: 'https://images.unsplash.com/photo-1494790108755-2616c96e1d0b?w=150&h=150&fit=crop&crop=face', style: { top: 160, right: 30 } },
  { id: 3, uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', style: { top: 280, left: 40 } },
  { id: 4, uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', style: { top: 320, right: 20 } },
  { id: 5, uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', style: { bottom: 280, left: 30 } },
  { id: 6, uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', style: { bottom: 240, right: 40 } },
];

export default function Welcome() {
  const handleCreateAccount = () => {
    router.push('/auth/register');
  };

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Floating Profile Images */}
      {profileImages.map((image) => (
        <View key={image.id} style={[styles.profileImageContainer, image.style]}>
          <Image source={{ uri: image.uri }} style={styles.profileImage} />
        </View>
      ))}

      {/* Main Content */}
      <View style={styles.centerContent}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.heartLogo}>
            <View style={[styles.heartLeft, styles.heartPart]} />
            <View style={[styles.heartRight, styles.heartPart]} />
            <View style={styles.heartBottom} />
          </View>
          
          <Text style={styles.appName}>tyte</Text>
          <Text style={styles.tagline}>Love without algorithm</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Créer son compte"
            onPress={handleCreateAccount}
            gradient={true}
            size="large"
            style={styles.primaryButton}
          />
          
          <Text style={styles.hasAccountText}>
            Vous avez déjà un compte?
          </Text>
          
          <Button
            title="S'identifier"
            onPress={handleSignIn}
            variant="outline"
            size="large"
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileImageContainer: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: 1,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    zIndex: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.15,
  },
  heartLogo: {
    width: 80,
    height: 80,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  heartPart: {
    width: 35,
    height: 28,
    position: 'absolute',
    borderRadius: 20,
    top: 0,
  },
  heartLeft: {
    left: 8,
    backgroundColor: '#60a5fa', // Light blue
    transform: [{ rotate: '-45deg' }],
  },
  heartRight: {
    right: 8,
    backgroundColor: '#f472b6', // Pink  
    transform: [{ rotate: '45deg' }],
  },
  heartBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderTopWidth: 35,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#a855f7', // Purple
    position: 'absolute',
    bottom: -5,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e3a8a', // Dark blue
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: FontSizes.md,
    color: '#a855f7', // Purple
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  actionButtons: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    marginBottom: Spacing.lg,
  },
  hasAccountText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
  },
  secondaryButton: {
    borderColor: '#C04AFF',
    borderWidth: 2,
  },
});