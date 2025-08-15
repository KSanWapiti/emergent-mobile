import React, { useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { Step1Form } from '../../components/forms/Step1Form';
import { Step2Form } from '../../components/forms/Step2Form';
import { Step3Form } from '../../components/forms/Step3Form';
import { Step4Form } from '../../components/forms/Step4Form';
import { Step1FormData, Step2FormData, Step3FormData, Step4FormData } from '../../utils/validation';
import { router } from 'expo-router';

type RegistrationData = {
  step1?: Step1FormData;
  step2?: Step2FormData;
  step3?: Step3FormData;
  step4?: Step4FormData;
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

  const handleStep4Next = async (data: Step4FormData) => {
    setLoading(true);
    try {
      const completeData = {
        ...registrationData.step1!,
        ...registrationData.step2!,
        ...registrationData.step3!,
        ...data,
      };

      console.log('Complete registration data:', completeData);
      
      // Mock API call - simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Inscription réussie!',
        'Votre compte Tyte a été créé avec succès.',
        [
          {
            text: 'Continuer',
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
          loading={loading}
        />
      )}
      {currentStep === 4 && (
        <Step4Form
          onNext={handleStep4Next}
          onBack={handleBack}
          defaultValues={registrationData.step4}
          loading={loading}
        />
      )}
    </SafeAreaView>
  );
}