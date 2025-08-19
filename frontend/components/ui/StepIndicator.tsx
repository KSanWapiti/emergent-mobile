import React from 'react';
import { View, Text } from 'react-native';
import { StepIndicatorStyles } from '../../styles/StepIndicatorStyles';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <View style={StepIndicatorStyles.container}>
      <View style={StepIndicatorStyles.stepsContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <View style={StepIndicatorStyles.stepWrapper}>
                {isCompleted ? (
                  <View style={StepIndicatorStyles.stepActive}>
                    <Text style={StepIndicatorStyles.stepActiveText}>
                      {stepNumber}
                    </Text>
                  </View>
                ) : (
                  <View style={StepIndicatorStyles.stepInactive}>
                    <Text style={StepIndicatorStyles.stepInactiveText}>
                      {stepNumber}
                    </Text>
                  </View>
                )}
              </View>
              {index < totalSteps - 1 && (
                <View style={[
                  StepIndicatorStyles.connector, 
                  isCompleted && StepIndicatorStyles.connectorActive
                ]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
      <Text style={StepIndicatorStyles.stepText}>
        Étape {currentStep} sur {totalSteps}
      </Text>
    </View>
  );
};