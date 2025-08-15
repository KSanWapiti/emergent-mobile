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
import { ImageUploader } from '../ui/ImageUploader';
import { NavigationHeader } from '../ui/NavigationHeader';
import { step4Schema, Step4FormData } from '../../utils/validation';
import { FormStyles } from '../../styles/FormStyles';

interface Step4FormProps {
  onNext: (data: Step4FormData) => void;
  onBack: () => void;
  defaultValues?: Partial<Step4FormData>;
  loading?: boolean;
}

export const Step4Form: React.FC<Step4FormProps> = ({
  onNext,
  onBack,
  defaultValues,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    mode: 'onChange',
    defaultValues: {
      portraitPhoto: defaultValues?.portraitPhoto || '',
      fullBodyPhoto: defaultValues?.fullBodyPhoto || '',
    },
  });

  const handleSkipPhotos = () => {
    console.log('Skip photos clicked - navigating to step 5');
    onNext({ portraitPhoto: '', fullBodyPhoto: '' });
  };

  const handleFormSubmit = (data: Step4FormData) => {
    console.log('Step4 form submitted with data:', data);
    onNext(data);
  };

  return (
    <View style={FormStyles.fullContainer}>
      <NavigationHeader showMenu={true} />
      <ProgressBar progress={80} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={FormStyles.keyboardContainer}
      >
        <ScrollView style={FormStyles.keyboardContainer} showsVerticalScrollIndicator={false}>
          <View style={FormStyles.stepContent}>
            <StepHeader
              title="Montrez votre authenticité"
              subtitle="Requis: photo de face + photo en pied"
            />

            <View style={FormStyles.stepForm}>
              <Controller
                control={control}
                name="portraitPhoto"
                render={({ field: { onChange, value } }) => (
                  <ImageUploader
                    label=""
                    placeholder="Portrait Photo"
                    value={value}
                    onImageChange={onChange}
                    isPortrait={true}
                  />
                )}
              />
              {errors.portraitPhoto && (
                <Text style={FormStyles.errorText}>{errors.portraitPhoto.message}</Text>
              )}

              <Controller
                control={control}
                name="fullBodyPhoto" 
                render={({ field: { onChange, value } }) => (
                  <ImageUploader
                    label=""
                    placeholder="Plain-pied Photo"
                    value={value}
                    onImageChange={onChange}
                    isPortrait={false}
                  />
                )}
              />
              {errors.fullBodyPhoto && (
                <Text style={FormStyles.errorText}>{errors.fullBodyPhoto.message}</Text>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={FormStyles.stepFooter}>
          <Button
            title="TEST - Force Step 5"
            onPress={handleSkipPhotos}
            variant="secondary"
            size="large"
            style={FormStyles.fullWidthButton}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};