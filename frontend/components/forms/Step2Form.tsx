import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { StepIndicator } from '../ui/StepIndicator';
import { step2Schema, Step2FormData } from '../../utils/validation';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/Colors';

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
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
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

  const dateOfBirth = watch('dateOfBirth');

  const handleDatePress = () => {
    Alert.alert(
      'Date de naissance',
      'Entrez votre date de naissance au format DD/MM/YYYY',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            // In a real app, you'd use a proper date picker here
            // For now, we'll use the text input
          },
        },
      ]
    );
  };

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
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <StepIndicator totalSteps={3} currentStep={2} />
          
          <View style={styles.header}>
            <Text style={styles.title}>Informations personnelles</Text>
            <Text style={styles.subtitle}>
              Aidez-nous à mieux vous connaître avec quelques informations de base
            </Text>
          </View>

          <View style={styles.form}>
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

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Retour"
            onPress={onBack}
            variant="outline"
            size="large"
            style={styles.backButton}
          />
          <Button
            title="Continuer"
            onPress={handleSubmit(onNext)}
            disabled={!isValid}
            size="large"
            style={styles.nextButton}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    paddingBottom: Spacing.xl,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});