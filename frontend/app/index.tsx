import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, FontSizes } from '../constants/Colors';

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        // TODO: Check if user is logged in (check token, etc.)
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate auth check
        
        // For now, always redirect to welcome
        router.replace('/welcome');
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/welcome');
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.logo}>Tyte</Text>
          <ActivityIndicator 
            size="large" 
            color={Colors.secondary} 
            style={styles.loader}
          />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.xl,
  },
  loader: {
    marginBottom: Spacing.lg,
  },
  loadingText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
  },
});