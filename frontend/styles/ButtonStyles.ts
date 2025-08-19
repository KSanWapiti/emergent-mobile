import { StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../constants/Colors';

export const ButtonStyles = StyleSheet.create({
  // Base button style
  button: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    minHeight: 44, // Minimum touch target for accessibility
  },

  // Primary button (Tyte purple)
  primaryButton: {
    backgroundColor: Colors.primary.start,
  },

  // Secondary button (Tyte pink)
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },

  // Outline button
  outlineButton: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    backgroundColor: 'transparent',
  },

  // Ghost button (transparent)
  ghostButton: {
    backgroundColor: 'transparent',
  },

  // Button text styles
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },

  outlineButtonText: {
    color: Colors.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },

  ghostButtonText: {
    color: Colors.text.secondary,
    fontWeight: '500',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  // Option button for forms
  optionButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.border.light,
    backgroundColor: '#FFFFFF',
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionButtonSelected: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  },

  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
  },

  optionTextSelected: {
    color: '#FFFFFF',
  },
});