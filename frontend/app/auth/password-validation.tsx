import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
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

// Validation schema pour la validation OTP et nouveau mot de passe
const validationSchema = z.object({
  otpCode: z
    .string()
    .length(6, 'Le code doit contenir 6 chiffres')
    .regex(/^\d{6}$/, 'Le code doit contenir uniquement des chiffres'),
  newPassword: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type ValidationFormData = z.infer<typeof validationSchema>;

export default function PasswordValidation() {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes en secondes
  const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ValidationFormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      otpCode: '',
      newPassword: '',
    },
  });

  // Timer pour le code OTP
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    // Permettre seulement les chiffres
    const numericValue = value.replace(/[^0-9]/g, '');
    
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = numericValue;
    setOtpInputs(newOtpInputs);

    // Mettre à jour le formulaire avec le code complet
    const fullCode = newOtpInputs.join('');
    setValue('otpCode', fullCode);

    // Passer au champ suivant si un chiffre est saisi
    if (numericValue && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    // Revenir au champ précédent si backspace est pressé et le champ est vide
    if (key === 'Backspace' && !otpInputs[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleChangePassword = async (data: ValidationFormData) => {
    setLoading(true);
    try {
      console.log('Changing password with:', data);
      
      // Simuler la validation OTP et changement de mot de passe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Mot de passe modifié',
        'Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.',
        [
          {
            text: 'Se connecter',
            onPress: () => router.replace('/auth/login')
          }
        ]
      );
      
    } catch (error) {
      console.error('Password change error:', error);
      Alert.alert(
        'Erreur',
        'Impossible de modifier le mot de passe. Veuillez vérifier le code saisi.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return;
    
    setTimeLeft(300);
    setOtpInputs(['', '', '', '', '', '']);
    setValue('otpCode', '');
    otpRefs.current[0]?.focus();
    
    Alert.alert(
      'Code renvoyé',
      'Un nouveau code de validation a été envoyé par SMS.',
      [{ text: 'OK' }]
    );
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
                <Text style={[GlobalStyles.title, styles.title]}>Validation</Text>
                <Text style={[GlobalStyles.subtitle, styles.subtitle]}>
                  Veuillez saisir les codes envoyés par SMS pour valider le changement de mot de passe.
                </Text>
              </View>
            </View>

            {/* OTP Section */}
            <View style={FormStyles.stepForm}>
              <Text style={styles.sectionTitle}>Code SMS</Text>
              
              <View style={styles.otpContainer}>
                {otpInputs.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => otpRefs.current[index] = ref}
                    style={[
                      styles.otpInput,
                      errors.otpCode && styles.otpInputError
                    ]}
                    value={value}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                  />
                ))}
              </View>

              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>
                  {timeLeft > 0 ? (
                    `Veuillez rentrer le code dans les ${formatTime(timeLeft)}`
                  ) : (
                    <TouchableOpacity onPress={handleResendCode}>
                      <Text style={styles.resendText}>Renvoyer le code</Text>
                    </TouchableOpacity>
                  )}
                </Text>
              </View>

              {errors.otpCode && (
                <Text style={styles.errorText}>{errors.otpCode.message}</Text>
              )}

              {/* New Password Field */}
              <View style={styles.passwordSection}>
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      label="Nouveau mot de passe"
                      placeholder="Nouveau mot de passe"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.newPassword?.message}
                      secureTextEntry={true}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={FormStyles.stepFooter}>
          <Button
            title="Changer le mot de passe"
            onPress={handleSubmit(handleChangePassword)}
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
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: 12,
    fontSize: FontSizes.xl,
    fontWeight: '600',
    backgroundColor: '#FFFFFF',
  },
  otpInputError: {
    borderColor: Colors.error,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  timerText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  resendText: {
    fontSize: FontSizes.md,
    color: '#1E90FF', // Blue color
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: FontSizes.sm,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  passwordSection: {
    marginTop: Spacing.lg,
  },
};