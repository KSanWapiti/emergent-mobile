import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { StepHeader } from '../ui/StepHeader';
import { step3Schema, Step3FormData } from '../../utils/validation';
import { FormStyles } from '../../styles/FormStyles';
import { ButtonStyles } from '../../styles/ButtonStyles';

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
      style={FormStyles.stepContainer}
    >
      <ProgressBar progress={60} />

      <ScrollView style={FormStyles.keyboardContainer} showsVerticalScrollIndicator={false}>
        <View style={FormStyles.stepContent}>
          <StepHeader
            title="Présentez-vous"
            subtitle="Ces informations nous aident à créer de meilleures connexions"
          />

          <View style={FormStyles.stepForm}>
            <View style={FormStyles.formSection}>
              <Text style={FormStyles.sectionTitle}>Genre</Text>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange } }) => (
                  <View style={FormStyles.optionsContainer}>
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
              {errors.gender && <Text style={FormStyles.errorText}>{errors.gender.message}</Text>}
            </View>

            <View style={FormStyles.formSection}>
              <Text style={FormStyles.sectionTitle}>Corpulence</Text>
              <Controller
                control={control}
                name="bodyType"
                render={({ field: { onChange } }) => (
                  <View style={FormStyles.optionsGrid}>
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
              {errors.bodyType && <Text style={FormStyles.errorText}>{errors.bodyType.message}</Text>}
            </View>

            <View style={FormStyles.formSection}>
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

      <View style={FormStyles.stepFooter}>
        <View style={FormStyles.buttonRow}>
          <Button
            title="Retour"
            onPress={onBack}
            variant="outline"
            size="large"
            style={FormStyles.backButton}
            disabled={loading}
          />
          <Button
            title="Suivant"
            onPress={handleSubmit(onNext)}
            disabled={!isValid}
            loading={loading}
            size="large"
            style={FormStyles.nextButton}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};