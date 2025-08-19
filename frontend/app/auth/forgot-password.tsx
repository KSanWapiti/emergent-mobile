import React, { useState } from 'react';
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

// Validation schema pour la réinitialisation du mot de passe
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Veuillez saisir une adresse e-mail valide')
    .min(1, 'L\'e-mail est requis'),
  phone: z
    .string()
    .min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres')
    .optional()
    .or(z.literal('')),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      phone: '',
    },
  });

  const handleSendResetCodes = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      console.log('Sending reset codes to:', data);
      
      // Simuler l'envoi des codes de réinitialisation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Codes envoyés',
        'Les codes de réinitialisation ont été envoyés sur votre email et/ou téléphone.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/auth/password-validation')
          }
        ]
      );
      
    } catch (error) {
      console.error('Reset password error:', error);
      Alert.alert(
        'Erreur',
        'Impossible d\'envoyer les codes de réinitialisation. Veuillez vérifier vos informations.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
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
                <Text style={[GlobalStyles.title, styles.title]}>Mot de passe oublié</Text>
                <Text style={[GlobalStyles.subtitle, styles.subtitle]}>
                  Veuillez saisir vos identifiants pour permettre la modification de votre mot de passe.
                </Text>
              </View>
            </View>

            {/* Reset Password Form */}
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
            </View>
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={FormStyles.stepFooter}>
          <Button
            title="Envoyer les codes de réinitialisation"
            onPress={handleSubmit(handleSendResetCodes)}
            disabled={!isValid}
            loading={loading}
            gradient={true}
            size="large"
            style={FormStyles.fullWidthButton}
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
};