import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioButtonGroupProps {
  title: string;
  options: RadioOption[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  title,
  options,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value.toString()}
            style={styles.radioOption}
            onPress={() => onValueChange(option.value)}
          >
            <View style={styles.radioCircle}>
              {selectedValue === option.value && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.radioLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.secondary,
  },
  radioLabel: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
  },
});