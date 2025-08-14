import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes } from '../../constants/Colors';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <View style={[styles.stepWrapper]}>
                {isCompleted ? (
                  <LinearGradient
                    colors={[Colors.primary.start, Colors.primary.end]}
                    style={styles.stepActive}
                  >
                    <Text style={styles.stepActiveText}>{stepNumber}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.stepInactive}>
                    <Text style={styles.stepInactiveText}>{stepNumber}</Text>
                  </View>
                )}
              </View>
              {index < totalSteps - 1 && (
                <View style={[styles.connector, isCompleted && styles.connectorActive]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
      <Text style={styles.stepText}>
        Étape {currentStep} sur {totalSteps}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  stepWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border.light,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepActiveText: {
    color: '#FFFFFF',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  stepInactiveText: {
    color: Colors.text.secondary,
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  connector: {
    width: 40,
    height: 2,
    backgroundColor: Colors.border.light,
    marginHorizontal: Spacing.xs,
  },
  connectorActive: {
    backgroundColor: Colors.secondary,
  },
  stepText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
});