import React, { useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { Step1Form } from '../../components/forms/Step1Form';
import { Step2Form } from '../../components/forms/Step2Form';
import { Step3Form } from '../../components/forms/Step3Form';
import { Step4Form } from '../../components/forms/Step4Form';
import { Step5Form } from '../../components/forms/Step5Form';
import { Step6Form } from '../../components/forms/Step6Form';
import { Step1FormData, Step2FormData, Step3FormData, Step4FormData, Step5FormData, Step6FormData } from '../../utils/validation';
import { router } from 'expo-router';

type RegistrationData = {
  step1?: Step1FormData;
  step2?: Step2FormData;
  step3?: Step3FormData;
  step4?: Step4FormData;
  step5?: Step5FormData;
  step6?: Step6FormData;
};

export default function RegisterScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({});
  const [loading, setLoading] = useState(false);

  const handleStep1Next = (data: Step1FormData) => {
    console.log('Step 1 data:', data);
    setRegistrationData(prev => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  const handleStep2Next = (data: Step2FormData) => {
    console.log('Step 2 data:', data);
    setRegistrationData(prev => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const handleStep3Next = (data: Step3FormData) => {
    console.log('Step 3 data:', data);
    setRegistrationData(prev => ({ ...prev, step3: data }));
    setCurrentStep(4);
  };

  const handleStep4Next = (data: Step4FormData) => {
    console.log('Step 4 data:', data);
    setRegistrationData(prev => ({ ...prev, step4: data }));
    setCurrentStep(5);
  };

  const handleStep5Next = (data: Step5FormData) => {
    console.log('Step 5 data:', data);
    setRegistrationData(prev => ({ ...prev, step5: data }));
    setCurrentStep(6);
  };

  const handleStep6Next = async (data: Step6FormData) => {
    setLoading(true);
    try {
      const completeData = {
        ...registrationData.step1!,
        ...registrationData.step2!,
        ...registrationData.step3!,
        ...registrationData.step4!,
        ...registrationData.step5!,
        ...data,
      };

      console.log('Complete registration data:', completeData);
      
      // Mock API call - simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Inscription réussie!',
        'Votre profil Tyte a été créé avec succès. Bienvenue dans la communauté !',
        [
          {
            text: 'Commencer',
            onPress: () => router.replace('/welcome')
          }
        ]
      );
      
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStep6Skip = async () => {
    setLoading(true);
    try {
      const completeData = {
        ...registrationData.step1!,
        ...registrationData.step2!,
        ...registrationData.step3!,
        ...registrationData.step4!,
        ...registrationData.step5!,
        // Step 6 data is optional, so we don't include it
      };

      console.log('Complete registration data (step 6 skipped):', completeData);
      
      // Mock API call - simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Inscription réussie!',
        'Votre profil Tyte a été créé avec succès. Vous pourrez compléter ces informations plus tard. Bienvenue dans la communauté !',
        [
          {
            text: 'Commencer',
            onPress: () => router.replace('/welcome')
          }
        ]
      );
      
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {currentStep === 1 && (
        <Step1Form
          onNext={handleStep1Next}
          defaultValues={registrationData.step1}
        />
      )}
      {currentStep === 2 && (
        <Step2Form
          onNext={handleStep2Next}
          onBack={handleBack}
          defaultValues={registrationData.step2}
        />
      )}
      {currentStep === 3 && (
        <Step3Form
          onNext={handleStep3Next}
          onBack={handleBack}
          defaultValues={registrationData.step3}
        />
      )}
      {currentStep === 4 && (
        <Step4Form
          onNext={handleStep4Next}
          onBack={handleBack}
          defaultValues={registrationData.step4}
        />
      )}
      {currentStep === 5 && (
        <Step5Form
          onNext={handleStep5Next}
          onBack={handleBack}
          defaultValues={registrationData.step5}
          loading={loading}
        />
      )}
      {currentStep === 6 && (
        <Step6Form
          onNext={handleStep6Next}
          onSkip={handleStep6Skip}
          onBack={handleBack}
          defaultValues={registrationData.step6}
          loading={loading}
        />
      )}
    </SafeAreaView>
  );
}