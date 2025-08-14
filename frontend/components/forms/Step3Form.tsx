import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { StepIndicator } from '../ui/StepIndicator';
import { step3Schema, Step3FormData } from '../../utils/validation';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/Colors';

interface Step3FormProps {
  onNext: (data: Step3FormData) => void;
  onBack: () => void;
  defaultValues?: Partial<Step3FormData>;
  loading?: boolean;
}

interface OptionButtonProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ title, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.optionButton, selected && styles.optionButtonSelected]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export const Step3Form: React.FC<Step3FormProps> = ({
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
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    mode: 'onChange',
    defaultValues: {
      gender: defaultValues?.gender || '',
      bodyType: defaultValues?.bodyType || '',
      city: defaultValues?.city || '',
    },
  });

  const gender = watch('gender');
  const bodyType = watch('bodyType');

  const genderOptions = [
    { value: 'homme', label: 'Homme' },
    { value: 'femme', label: 'Femme' },
    { value: 'autre', label: 'Autre' },
  ];

  const bodyTypeOptions = [
    { value: 'mince', label: 'Mince' },
    { value: 'moyenne', label: 'Moyenne' },
    { value: 'athlétique', label: 'Athlétique' },
    { value: 'musclée', label: 'Musclée' },
    { value: 'ronde', label: 'Ronde' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <StepIndicator totalSteps={3} currentStep={3} />
          
          <View style={styles.header}>
            <Text style={styles.title}>Présentez-vous</Text>
            <Text style={styles.subtitle}>
              Ces informations nous aident à créer de meilleures connexions
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Genre</Text>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange } }) => (
                  <View style={styles.optionsContainer}>
                    {genderOptions.map((option) => (
                      <OptionButton
                        key={option.value}
                        title={option.label}
                        selected={gender === option.value}
                        onPress={() => onChange(option.value)}
                      />
                    ))}
                  </View>
                )}
              />
              {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Corpulence</Text>
              <Controller
                control={control}
                name="bodyType"
                render={({ field: { onChange } }) => (
                  <View style={styles.optionsGrid}>
                    {bodyTypeOptions.map((option) => (
                      <OptionButton
                        key={option.value}
                        title={option.label}
                        selected={bodyType === option.value}
                        onPress={() => onChange(option.value)}
                      />
                    ))}
                  </View>
                )}
              />
              {errors.bodyType && <Text style={styles.errorText}>{errors.bodyType.message}</Text>}
            </View>

            <View style={styles.section}>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Ville"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Ex: Paris"
                    autoCapitalize="words"
                    error={errors.city?.message}
                    required
                  />
                )}
              />
            </View>
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
            disabled={loading}
          />
          <Button
            title="Créer mon compte"
            onPress={handleSubmit(onNext)}
            disabled={!isValid}
            loading={loading}
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
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  optionsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.border.light,
    backgroundColor: '#FFFFFF',
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  },
  optionText: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: FontSizes.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
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