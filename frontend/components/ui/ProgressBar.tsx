import React from 'react';
import { View } from 'react-native';
import { FormStyles } from '../../styles/FormStyles';

interface ProgressBarProps {
  progress: number; // 0-100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={FormStyles.progressHeader}>
      <View style={FormStyles.progressBar}>
        <View style={[FormStyles.progressFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};