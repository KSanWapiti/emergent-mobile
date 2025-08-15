import { StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/Colors';

export const InputStyles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  label: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },

  required: {
    color: Colors.error,
  },

  input: {
    borderWidth: 1.5,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    backgroundColor: '#FFFFFF',
    minHeight: 48, // Accessibility minimum
  },

  inputError: {
    borderColor: Colors.error,
  },

  errorText: {
    fontSize: FontSizes.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});