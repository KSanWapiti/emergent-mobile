import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { StepIndicator } from '../ui/StepIndicator';
import { step1Schema, Step1FormData } from '../../utils/validation';
import { Colors, Spacing, FontSizes } from '../../constants/Colors';

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
      style={styles.container}
    >
      <View style={styles.content}>
        <StepIndicator totalSteps={3} currentStep={1} />
        
        <View style={styles.header}>
          <Text style={styles.title}>Choisissez votre pseudo</Text>
          <Text style={styles.subtitle}>
            Ce sera votre identité sur Tyte. Choisissez quelque chose qui vous représente !
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="pseudo"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Pseudo"
                value={value}
                onChangeText={onChange}
                placeholder="Ex: alex123"
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

      <View style={styles.footer}>
        <Button
          title="Continuer"
          onPress={handleSubmit(onNext)}
          disabled={!isValid}
          size="large"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
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
    flex: 1,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },
});