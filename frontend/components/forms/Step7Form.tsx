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
import { NavigationHeader } from '../ui/NavigationHeader';
import { ImageUploader } from '../ui/ImageUploader';
import { step7Schema, Step7FormData } from '../../utils/validation';
import { FormStyles } from '../../styles/FormStyles';

interface Step7FormProps {
  onNext: (data: Step7FormData) => void;
  onSkip: () => void;
  onBack: () => void;
  defaultValues?: Partial<Step7FormData>;
  loading?: boolean;
}

export const Step7Form: React.FC<Step7FormProps> = ({
  onNext,
  onSkip,
  onBack,
  defaultValues,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step7FormData>({
    resolver: zodResolver(step7Schema),
    mode: 'onChange',
    defaultValues: {
      video: defaultValues?.video || '',
      additionalPhoto1: defaultValues?.additionalPhoto1 || '',
      additionalPhoto2: defaultValues?.additionalPhoto2 || '',
      additionalPhoto3: defaultValues?.additionalPhoto3 || '',
      additionalPhoto4: defaultValues?.additionalPhoto4 || '',
      additionalPhoto5: defaultValues?.additionalPhoto5 || '',
      additionalPhoto6: defaultValues?.additionalPhoto6 || '',
    },
  });

  const handleFormSubmit = (data: Step7FormData) => {
    console.log('Step7 form submitted with data:', data);
    onNext(data);
  };

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
              title="Création du profil"
              subtitle="Si vous le souhaitez, vous pouvez ajouter une vidéo et d'autres photos pour vous présenter"
            />

            <View style={FormStyles.stepForm}>
              {/* Video Section */}
              <View style={FormStyles.mediaSection}>
                <Text style={FormStyles.mediaSectionTitle}>Ajouter une vidéo</Text>
                <Controller
                  control={control}
                  name="video"
                  render={({ field: { onChange, value } }) => (
                    <ImageUploader
                      label=""
                      placeholder="Ajouter une vidéo"
                      value={value}
                      onImageSelected={onChange}
                      error={errors.video?.message}
                      isVideo={true}
                      style={FormStyles.videoUploader}
                    />
                  )}
                />
              </View>

              {/* Photos Grid Section */}
              <View style={FormStyles.mediaSection}>
                <View style={FormStyles.photosGrid}>
                  {/* Row 1 */}
                  <View style={FormStyles.photosRow}>
                    <Controller
                      control={control}
                      name="additionalPhoto1"
                      render={({ field: { onChange, value } }) => (
                        <ImageUploader
                          label=""
                          placeholder="Ajouter une photo"
                          value={value}
                          onImageSelected={onChange}
                          error={errors.additionalPhoto1?.message}
                          style={FormStyles.gridPhotoUploader}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="additionalPhoto2"
                      render={({ field: { onChange, value } }) => (
                        <ImageUploader
                          label=""
                          placeholder="Ajouter une photo"
                          value={value}
                          onImageSelected={onChange}
                          error={errors.additionalPhoto2?.message}
                          style={FormStyles.gridPhotoUploader}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="additionalPhoto3"
                      render={({ field: { onChange, value } }) => (
                        <ImageUploader
                          label=""
                          placeholder="Ajouter une photo"
                          value={value}
                          onImageSelected={onChange}
                          error={errors.additionalPhoto3?.message}
                          style={FormStyles.gridPhotoUploader}
                        />
                      )}
                    />
                  </View>

                  {/* Row 2 */}
                  <View style={FormStyles.photosRow}>
                    <Controller
                      control={control}
                      name="additionalPhoto4"
                      render={({ field: { onChange, value } }) => (
                        <ImageUploader
                          label=""
                          placeholder="Ajouter une photo"
                          value={value}
                          onImageSelected={onChange}
                          error={errors.additionalPhoto4?.message}
                          style={FormStyles.gridPhotoUploader}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="additionalPhoto5"
                      render={({ field: { onChange, value } }) => (
                        <ImageUploader
                          label=""
                          placeholder="Ajouter une photo"
                          value={value}
                          onImageSelected={onChange}
                          error={errors.additionalPhoto5?.message}
                          style={FormStyles.gridPhotoUploader}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="additionalPhoto6"
                      render={({ field: { onChange, value } }) => (
                        <ImageUploader
                          label=""
                          placeholder="Ajouter une photo"
                          value={value}
                          onImageSelected={onChange}
                          error={errors.additionalPhoto6?.message}
                          style={FormStyles.gridPhotoUploader}
                        />
                      )}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={FormStyles.stepFooter}>
          <Button
            title="Finaliser la création du profil"
            onPress={handleSubmit(handleFormSubmit)}
            loading={loading}
            size="large"
            style={FormStyles.fullWidthButton}
          />
          
          <Button
            title="Je remplirais plus tard"
            onPress={onSkip}
            variant="ghost"
            size="large"
            style={[FormStyles.fullWidthButton, { marginTop: 12 }]}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};