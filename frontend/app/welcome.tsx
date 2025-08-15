import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { WelcomeStyles } from '../styles/WelcomeStyles';

export default function WelcomeScreen() {
  const handleSignUp = () => {
    router.push('/auth/register');
  };

  const handleSignIn = () => {
    // TODO: Navigate to sign in screen
    console.log('Sign in pressed');
  };

  return (
    <SafeAreaView style={WelcomeStyles.container}>
      <View style={WelcomeStyles.gradient}>
        <View style={WelcomeStyles.content}>
          <View style={WelcomeStyles.header}>
            <Text style={WelcomeStyles.logo}>Tyte</Text>
            <Text style={WelcomeStyles.tagline}>
              Des rencontres authentiques, sans algorithmes
            </Text>
          </View>

          <View style={WelcomeStyles.footer}>
            <TouchableOpacity
              style={WelcomeStyles.primaryButton}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text style={WelcomeStyles.primaryButtonText}>Créer un compte</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={WelcomeStyles.secondaryButton}
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <Text style={WelcomeStyles.secondaryButtonText}>J'ai déjà un compte</Text>
            </TouchableOpacity>

            <Text style={WelcomeStyles.termsText}>
              En continuant, vous acceptez nos conditions d'utilisation
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}