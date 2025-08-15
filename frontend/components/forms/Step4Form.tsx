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
import { GradientText } from '../ui/GradientText';
import { ImageUploader } from '../ui/ImageUploader';
import { NavigationHeader } from '../ui/NavigationHeader';
import { step4Schema, Step4FormData } from '../../utils/validation';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

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
    formState: { errors, isValid },
    watch,
  } = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    mode: 'onChange',
    defaultValues: {
      portraitPhoto: defaultValues?.portraitPhoto || '',
      fullBodyPhoto: defaultValues?.fullBodyPhoto || '',
    },
  });

  const portraitPhoto = watch('portraitPhoto');
  const fullBodyPhoto = watch('fullBodyPhoto');

  return (
    <View style={styles.container}>
      <NavigationHeader showMenu={true} />
      
      {/* Header avec barre de progression */}
      <View style={styles.progressHeader}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '80%' }]} />
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
              <Text style={GlobalStyles.title}>Montrez votre authenticité</Text>
              <Text style={GlobalStyles.subtitle}>
                Requis: photo de face + photo en pied
              </Text>
            </View>

            <View style={styles.form}>
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
                <Text style={GlobalStyles.errorText}>{errors.portraitPhoto.message}</Text>
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
                <Text style={GlobalStyles.errorText}>{errors.fullBodyPhoto.message}</Text>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={GlobalStyles.footer}>
          <Button
            title="Suivant"
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
};