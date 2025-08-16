import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { NavigationHeader } from '../../components/ui/NavigationHeader';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { FormStyles } from '../../styles/FormStyles';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

// Validation schema pour la connexion
const loginSchema = z.object({
  email: z
    .string()
    .email('Veuillez saisir une adresse e-mail valide')
    .min(1, 'L\'e-mail est requis'),
  phone: z
    .string()
    .min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres')
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      phone: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      console.log('Login attempt:', data);
      
      // TODO: Implement actual login logic
      Alert.alert(
        'Connexion',
        'Fonctionnalité de connexion en cours de développement',
        [{ text: 'OK' }]
      );
      
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Erreur',
        'Impossible de se connecter. Veuillez vérifier vos identifiants.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Mot de passe oublié',
      'Fonctionnalité de récupération de mot de passe en cours de développement',
      [{ text: 'OK' }]
    );
  };

  const handleCreateAccount = () => {
    router.push('/auth/register');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={FormStyles.fullContainer}>
      <NavigationHeader showMenu={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={FormStyles.keyboardContainer}
      >
        <ScrollView style={FormStyles.keyboardContainer} showsVerticalScrollIndicator={false}>
          <View style={FormStyles.stepContent}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              
              <View style={styles.titleContainer}>
                <Text style={[GlobalStyles.title, styles.title]}>S'authentifier</Text>
                <Text style={[GlobalStyles.subtitle, styles.subtitle]}>
                  Veuillez saisir vos identifiants pour accéder à votre compte.
                </Text>
              </View>
            </View>

            {/* Login Form */}
            <View style={FormStyles.stepForm}>
              {/* Email Field */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Email"
                    placeholder="Votre e-mail"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />

              {/* Phone Field */}
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Numéro de téléphone"
                    placeholder="Votre numéro"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.phone?.message}
                    keyboardType="phone-pad"
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Mot de passe"
                    placeholder="Mot de passe"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    secureTextEntry={true}
                  />
                )}
              />

              {/* Forgot Password Link */}
              <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={FormStyles.stepFooter}>
          <Button
            title="S'authentifier"
            onPress={handleSubmit(handleLogin)}
            disabled={!isValid}
            gradient={true}
            size="large"
            style={FormStyles.fullWidthButton}
          />
          
          <Text style={styles.noAccountText}>
            Pas de compte?
          </Text>
          
          <Button
            title="Créer votre compte"
            onPress={handleCreateAccount}
            variant="outline"
            size="large"
            style={[FormStyles.fullWidthButton, styles.createAccountButton]}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = {
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  backButton: {
    padding: Spacing.sm,
    marginRight: Spacing.md,
    marginTop: Spacing.xs,
  },
  backArrow: {
    fontSize: 24,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: Colors.secondary,
    textAlign: 'left',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    textAlign: 'left',
    lineHeight: 22,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  forgotPasswordText: {
    fontSize: FontSizes.md,
    color: '#1E90FF', // Blue color
    fontWeight: '500',
  },
  noAccountText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginVertical: Spacing.md,
  },
  createAccountButton: {
    borderColor: Colors.secondary,
    borderWidth: 2,
  },
};