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
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { StepHeader } from '../ui/StepHeader';
import { RadioGroup } from '../ui/RadioGroup';
import { NavigationHeader } from '../ui/NavigationHeader';
import { step5Schema, Step5FormData } from '../../utils/validation';
import { FormStyles } from '../../styles/FormStyles';

interface Step5FormProps {
  onNext: (data: Step5FormData) => void;
  onBack: () => void;
  defaultValues?: Partial<Step5FormData>;
  loading?: boolean;
}

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
    <View style={FormStyles.fullContainer}>
      <NavigationHeader showMenu={true} />
      <ProgressBar progress={100} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={FormStyles.keyboardContainer}
      >
        <ScrollView style={FormStyles.keyboardContainer} showsVerticalScrollIndicator={false}>
          <View style={FormStyles.stepContent}>
            <StepHeader
              title="Configurer votre boîte de réception"
              subtitle="Faites votre choix de comportement"
            />

            <View style={FormStyles.stepForm}>
              <View style={FormStyles.formSection}>
                <Text style={FormStyles.sectionTitleMedium}>
                  Nombre maximum de messages reçus par jour:
                </Text>
                <Controller
                  control={control}
                  name="maxMessagesPerDay"
                  render={({ field: { onChange } }) => (
                    <RadioGroup
                      options={messageOptions}
                      selectedValue={maxMessagesPerDay}
                      onValueChange={onChange}
                      error={errors.maxMessagesPerDay?.message}
                    />
                  )}
                />
              </View>

              <View style={FormStyles.formSection}>
                <Text style={FormStyles.sectionTitleMedium}>
                  Nombre maximum d'invitations par jour:
                </Text>
                <Controller
                  control={control}
                  name="maxInvitationsPerDay"
                  render={({ field: { onChange } }) => (
                    <RadioGroup
                      options={invitationOptions}
                      selectedValue={maxInvitationsPerDay}
                      onValueChange={onChange}
                      error={errors.maxInvitationsPerDay?.message}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={FormStyles.stepFooter}>
          <Button
            title="Suivant"
            onPress={handleSubmit(onNext)}
            disabled={!isValid}
            loading={loading}
            size="large"
            style={FormStyles.fullWidthButton}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};