import React from 'react';
import { View, Text } from 'react-native';
import { GradientText } from './GradientText';
import { FormStyles } from '../../styles/FormStyles';

interface StepHeaderProps {
  title: string;
  subtitle: string;
  showGradientTitle?: boolean;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  subtitle,
  showGradientTitle = true,
}) => {
  return (
    <View style={FormStyles.stepHeader}>
      {showGradientTitle && (
        <GradientText style={FormStyles.gradientTitle}>
          Création du profil
        </GradientText>
      )}
      <Text style={FormStyles.stepTitle}>{title}</Text>
      <Text style={FormStyles.stepSubtitle}>{subtitle}</Text>
    </View>
  );
};