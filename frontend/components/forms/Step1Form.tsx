import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { step1Schema, Step1FormData } from '../../utils/validation';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

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
      style={GlobalStyles.container}
    >
      {/* Header avec barre de progression */}
      <View style={styles.progressHeader}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '25%' }]} />
        </View>
      </View>

      <View style={GlobalStyles.content}>        
        <View style={GlobalStyles.header}>
          <GradientText style={styles.mainTitle}>Création du profil</GradientText>
          <Text style={GlobalStyles.title}>Choisissez votre pseudo</Text>
          <Text style={GlobalStyles.subtitle}>
            Votre @unique dans l'app!
          </Text>
        </View>

        <View style={GlobalStyles.form}>
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

      <View style={GlobalStyles.footer}>
        <Button
          title="Suivant"
          onPress={handleSubmit(onNext)}
          disabled={!isValid}
          size="large"
        />
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