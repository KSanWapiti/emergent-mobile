import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { NavigationHeader } from '../ui/NavigationHeader';
import { step5Schema, Step5FormData } from '../../utils/validation';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants/Colors';

interface Step5FormProps {
  onNext: (data: Step5FormData) => void;
  onBack: () => void;
  defaultValues?: Partial<Step5FormData>;
  loading?: boolean;
}

interface RadioOptionProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: () => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, value, selected, onPress }) => (
  <TouchableOpacity style={styles.radioOption} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

export const Step5Form: React.FC<Step5FormProps> = ({
  onNext,
  onBack,
  defaultValues,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<Step5FormData>({
    resolver: zodResolver(step5Schema),
    mode: 'onChange',
    defaultValues: {
      maxMessagesPerDay: defaultValues?.maxMessagesPerDay || '3',
      maxInvitationsPerDay: defaultValues?.maxInvitationsPerDay || '5',
    },
  });

  const maxMessagesPerDay = watch('maxMessagesPerDay');
  const maxInvitationsPerDay = watch('maxInvitationsPerDay');

  const messageOptions = [
    { value: '0', label: '0 (je préfère contacter)' },
    { value: '3', label: '3' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
  ];

  const invitationOptions = [
    { value: '0', label: '0' },
    { value: '3', label: '3' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
  ];

  return (
    <View style={styles.container}>
      <NavigationHeader showMenu={true} />
      
      {/* Header avec barre de progression */}
      <View style={styles.progressHeader}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView style={GlobalStyles.safeArea} showsVerticalScrollIndicator={false}>
          <View style={GlobalStyles.content}>
            <View style={GlobalStyles.header}>
              <GradientText style={styles.mainTitle}>Création du profil</GradientText>
              <Text style={GlobalStyles.title}>Configurer votre boîte de réception</Text>
              <Text style={GlobalStyles.subtitle}>
                Faites votre choix de comportement
              </Text>
            </View>

            <View style={styles.form}>
              {/* Section Messages */}
              <View style={GlobalStyles.section}>
                <Text style={styles.sectionTitle}>Nombre maximum de messages reçus par jour:</Text>
                <Controller
                  control={control}
                  name="maxMessagesPerDay"
                  render={({ field: { onChange } }) => (
                    <View style={styles.optionsContainer}>
                      {messageOptions.map((option) => (
                        <RadioOption
                          key={option.value}
                          label={option.label}
                          value={option.value}
                          selected={maxMessagesPerDay === option.value}
                          onPress={() => onChange(option.value)}
                        />
                      ))}
                    </View>
                  )}
                />
                {errors.maxMessagesPerDay && (
                  <Text style={GlobalStyles.errorText}>{errors.maxMessagesPerDay.message}</Text>
                )}
              </View>

              {/* Section Invitations */}
              <View style={GlobalStyles.section}>
                <Text style={styles.sectionTitle}>Nombre maximum d'invitations par jour:</Text>
                <Controller
                  control={control}
                  name="maxInvitationsPerDay"
                  render={({ field: { onChange } }) => (
                    <View style={styles.optionsContainer}>
                      {invitationOptions.map((option) => (
                        <RadioOption
                          key={option.value}
                          label={option.label}
                          value={option.value}
                          selected={maxInvitationsPerDay === option.value}
                          onPress={() => onChange(option.value)}
                        />
                      ))}
                    </View>
                  )}
                />
                {errors.maxInvitationsPerDay && (
                  <Text style={GlobalStyles.errorText}>{errors.maxInvitationsPerDay.message}</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={GlobalStyles.footer}>
          <Button
            title="Finaliser l'essentiel"
            onPress={handleSubmit(onNext)}
            disabled={!isValid}
            loading={loading}
            size="large"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  keyboardContainer: {
    flex: 1,
  },
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
  form: {
    paddingBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  radioOption: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.medium,
    backgroundColor: '#FFFFFF',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  radioCircleSelected: {
    borderColor: Colors.secondary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.secondary,
  },
  radioLabel: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    flex: 1,
  },
};