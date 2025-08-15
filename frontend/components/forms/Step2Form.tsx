import React from 'react';
import { 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { step2Schema, Step2FormData } from '../../utils/validation';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

interface Step2FormProps {
  onNext: (data: Step2FormData) => void;
  onBack: () => void;
  defaultValues?: Partial<Step2FormData>;
}

export const Step2Form: React.FC<Step2FormProps> = ({
  onNext,
  onBack,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    mode: 'onChange',
    defaultValues: {
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      height: defaultValues?.height || '',
      dateOfBirth: defaultValues?.dateOfBirth || '',
    },
  });

  const formatDate = (text: string) => {
    // Auto-format date as user types
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={GlobalStyles.container}
    >
      {/* Header avec barre de progression */}
      <View style={styles.progressHeader}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
      </View>

      <ScrollView style={GlobalStyles.safeArea} showsVerticalScrollIndicator={false}>
        <View style={GlobalStyles.content}>
          <View style={GlobalStyles.header}>
            <GradientText style={styles.mainTitle}>Création du profil</GradientText>
            <Text style={GlobalStyles.title}>Informations personnelles</Text>
            <Text style={GlobalStyles.subtitle}>
              Aidez-nous à mieux vous connaître avec quelques informations de base
            </Text>
          </View>

          <View style={GlobalStyles.form}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Prénom"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Votre prénom"
                  autoCapitalize="words"
                  error={errors.firstName?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nom"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Votre nom"
                  autoCapitalize="words"
                  error={errors.lastName?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="height"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Taille (cm)"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Ex: 175"
                  keyboardType="numeric"
                  error={errors.height?.message}
                  required
                  maxLength={3}
                />
              )}
            />

            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Date de naissance"
                  value={value}
                  onChangeText={(text) => {
                    const formatted = formatDate(text);
                    onChange(formatted);
                  }}
                  placeholder="DD/MM/YYYY"
                  keyboardType="numeric"
                  error={errors.dateOfBirth?.message}
                  required
                  maxLength={10}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>

      <View style={GlobalStyles.footer}>
        <View style={GlobalStyles.buttonContainer}>
          <Button
            title="Retour"
            onPress={onBack}
            variant="outline"
            size="large"
            style={GlobalStyles.backButton}
          />
          <Button
            title="Suivant"
            onPress={handleSubmit(onNext)}
            disabled={!isValid}
            size="large"
            style={GlobalStyles.nextButton}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = {
  progressHeader: {
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden' as const,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 2,
  },
  mainTitle: {
    fontSize: FontSizes.title,
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    marginBottom: Spacing.xs,
  },
};