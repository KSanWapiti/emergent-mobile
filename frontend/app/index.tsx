import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

// Import logo as base64 (we'll add this)
const TYTE_LOGO_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='; // Placeholder

const { width, height } = Dimensions.get('window');

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time and logo loading
    const timer = setTimeout(() => {
      setLogoLoaded(true);
    }, 1000);

    // Check auth after logo is loaded
    const authTimer = setTimeout(() => {
      // TODO: Check if user is logged in (check token, etc.)
      router.replace('/welcome');
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(authTimer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            {/* Heart-shaped logo placeholder - we'll replace with actual logo */}
            <View style={styles.heartLogo}>
              <View style={[styles.heartLeft, styles.heartPart]} />
              <View style={[styles.heartRight, styles.heartPart]} />
              <View style={styles.heartBottom} />
            </View>
          </View>
          
          <Text style={styles.appName}>tyte</Text>
          <Text style={styles.tagline}>Love without algorithm</Text>
        </View>

        {/* Loading Section */}
        <View style={styles.loadingSection}>
          {logoLoaded && (
            <>
              <ActivityIndicator 
                size="large" 
                color={Colors.secondary} 
                style={styles.loader}
              />
              <Text style={styles.loadingText}>Chargement...</Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a', // Deep blue background like in the logo
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.15,
  },
  logoWrapper: {
    marginBottom: Spacing.xl,
  },
  // Heart logo recreation with CSS
  heartLogo: {
    width: 120,
    height: 120,
    position: 'relative' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartPart: {
    width: 50,
    height: 40,
    position: 'absolute' as const,
    borderRadius: 25,
    top: 0,
  },
  heartLeft: {
    left: 10,
    backgroundColor: '#60a5fa', // Light blue
    transform: [{ rotate: '-45deg' }],
  },
  heartRight: {
    right: 10,
    backgroundColor: '#f472b6', // Pink
    transform: [{ rotate: '45deg' }],
  },
  heartBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 35,
    borderRightWidth: 35,
    borderTopWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#a855f7', // Purple
    position: 'absolute' as const,
    bottom: -10,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: FontSizes.md,
    color: '#FFFFFF',
    opacity: 0.8,
    fontStyle: 'italic' as const,
  },
  loadingSection: {
    alignItems: 'center',
    position: 'absolute' as const,
    bottom: height * 0.15,
    width: '100%',
  },
  loader: {
    marginBottom: Spacing.lg,
  },
  loadingText: {
    fontSize: FontSizes.md,
    color: '#FFFFFF',
    opacity: 0.9,
  },
};