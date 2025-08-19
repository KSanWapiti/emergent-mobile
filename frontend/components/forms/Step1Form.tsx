import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { StepHeader } from '../ui/StepHeader';
import { step1Schema, Step1FormData } from '../../utils/validation';
import { FormStyles } from '../../styles/FormStyles';

interface Step1FormProps {
  onNext: (data: Step1FormData) => void;
  defaultValues?: Partial<Step1FormData>;
}

export const Step1Form: React.FC<Step1FormProps> = ({
  onNext,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    mode: 'onChange',
    defaultValues: {
      pseudo: defaultValues?.pseudo || '',
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={FormStyles.stepContainer}
    >
      <ProgressBar progress={20} />

      <View style={FormStyles.stepContent}>
        <StepHeader
          title="Choisissez votre pseudo"
          subtitle="Votre @unique dans l'app!"
        />

        <View style={FormStyles.stepForm}>
          <Controller
            control={control}
            name="pseudo"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Pseudo"
                value={value}
                onChangeText={onChange}
                placeholder="Ex: JeanSportif23"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.pseudo?.message}
                required
                maxLength={20}
              />
            )}
          />
        </View>
      </View>

      <View style={FormStyles.stepFooter}>
        <Button
          title="Suivant"
          onPress={handleSubmit(onNext)}
          disabled={!isValid}
          size="large"
          style={FormStyles.fullWidthButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};