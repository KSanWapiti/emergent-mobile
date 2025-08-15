import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors, FontSizes } from '../constants/Colors';

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
      <SafeAreaView style={GlobalStyles.container}>
        <View style={[GlobalStyles.content, GlobalStyles.centered]}>
          <Text style={styles.logo}>Tyte</Text>
          <ActivityIndicator 
            size="large" 
            color={Colors.secondary} 
            style={styles.loader}
          />
          <Text style={GlobalStyles.subtitle}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = {
  logo: {
    fontSize: 48,
    fontWeight: 'bold' as const,
    color: Colors.text.primary,
    marginBottom: 32,
  },
  loader: {
    marginBottom: 24,
  },
};