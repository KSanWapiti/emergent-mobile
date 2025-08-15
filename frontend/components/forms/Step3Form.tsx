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
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { step3Schema, Step3FormData } from '../../utils/validation';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

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
    style={[ButtonStyles.optionButton, selected && ButtonStyles.optionButtonSelected]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[ButtonStyles.optionText, selected && ButtonStyles.optionTextSelected]}>
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
      style={GlobalStyles.container}
    >
      {/* Header avec barre de progression */}
      <View style={styles.progressHeader}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
      </View>

      <ScrollView style={GlobalStyles.safeArea} showsVerticalScrollIndicator={false}>
        <View style={GlobalStyles.content}>
          <View style={GlobalStyles.header}>
            <GradientText style={styles.mainTitle}>Création du profil</GradientText>
            <Text style={GlobalStyles.title}>Présentez-vous</Text>
            <Text style={GlobalStyles.subtitle}>
              Ces informations nous aident à créer de meilleures connexions
            </Text>
          </View>

          <View style={GlobalStyles.form}>
            <View style={GlobalStyles.section}>
              <Text style={GlobalStyles.sectionTitle}>Genre</Text>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange } }) => (
                  <View style={GlobalStyles.optionsContainer}>
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
              {errors.gender && <Text style={GlobalStyles.errorText}>{errors.gender.message}</Text>}
            </View>

            <View style={GlobalStyles.section}>
              <Text style={GlobalStyles.sectionTitle}>Corpulence</Text>
              <Controller
                control={control}
                name="bodyType"
                render={({ field: { onChange } }) => (
                  <View style={GlobalStyles.optionsGrid}>
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
              {errors.bodyType && <Text style={GlobalStyles.errorText}>{errors.bodyType.message}</Text>}
            </View>

            <View style={GlobalStyles.section}>
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

      <View style={GlobalStyles.footer}>
        <View style={GlobalStyles.buttonContainer}>
          <Button
            title="Retour"
            onPress={onBack}
            variant="outline"
            size="large"
            style={GlobalStyles.backButton}
            disabled={loading}
          />
          <Button
            title="Suivant"
            onPress={handleSubmit(onNext)}
            disabled={!isValid}
            loading={loading}
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