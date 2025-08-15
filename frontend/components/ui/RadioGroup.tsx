import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FormStyles } from '../../styles/FormStyles';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onValueChange,
  error,
}) => {
  return (
    <View style={FormStyles.optionsContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={FormStyles.radioOption}
          onPress={() => onValueChange(option.value)}
          activeOpacity={0.7}
        >
          <View style={[
            FormStyles.radioCircle,
            selectedValue === option.value && FormStyles.radioCircleSelected
          ]}>
            {selectedValue === option.value && (
              <View style={FormStyles.radioInner} />
            )}
          </View>
          <Text style={FormStyles.radioLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      {error && <Text style={FormStyles.errorText}>{error}</Text>}
    </View>
  );
};