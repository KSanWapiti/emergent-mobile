import React from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { StepHeader } from '../ui/StepHeader';
import { step2Schema, Step2FormData } from '../../utils/validation';
import { FormStyles } from '../../styles/FormStyles';

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
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={FormStyles.stepContainer}
    >
      <ProgressBar progress={40} />

      <ScrollView style={FormStyles.keyboardContainer} showsVerticalScrollIndicator={false}>
        <View style={FormStyles.stepContent}>
          <StepHeader
            title="Informations personnelles"
            subtitle="Aidez-nous à mieux vous connaître avec quelques informations de base"
          />

          <View style={FormStyles.stepForm}>
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

      <View style={FormStyles.stepFooter}>
        <View style={FormStyles.buttonRow}>
          <Button
            title="Retour"
            onPress={onBack}
            variant="outline"
            size="large"
            style={FormStyles.backButton}
          />
          <Button
            title="Suivant"
            onPress={handleSubmit(onNext)}
            disabled={!isValid}
            size="large"
            style={FormStyles.nextButton}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};