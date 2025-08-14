import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Step1Form } from '../../components/forms/Step1Form';
import { Step2Form } from '../../components/forms/Step2Form';
import { Step3Form } from '../../components/forms/Step3Form';
import { Step1FormData, Step2FormData, Step3FormData } from '../../utils/validation';
import { router } from 'expo-router';

type RegistrationData = {
  step1?: Step1FormData;
  step2?: Step2FormData;
  step3?: Step3FormData;
};

export default function RegisterScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({});
  const [loading, setLoading] = useState(false);

  const handleStep1Next = (data: Step1FormData) => {
    setRegistrationData(prev => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  const handleStep2Next = (data: Step2FormData) => {
    setRegistrationData(prev => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const handleStep3Next = async (data: Step3FormData) => {
    setLoading(true);
    try {
      const completeData = {
        ...registrationData.step1!,
        ...registrationData.step2!,
        ...data,
      };

      // TODO: Call API to register user
      console.log('Registration data:', completeData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success or main app
      router.replace('/');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (show alert, etc.)
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
    </SafeAreaView>
  );
}