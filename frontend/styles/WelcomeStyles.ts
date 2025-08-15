import { StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/Colors';

export const WelcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gradient: {
    flex: 1,
    backgroundColor: Colors.primary.start,
  },

  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'space-between',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  tagline: {
    fontSize: FontSizes.lg,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },

  footer: {
    paddingBottom: Spacing.xl,
  },

  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md + 2,
    marginBottom: Spacing.md,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: Colors.primary.start,
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },

  secondaryButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.lg,
    fontWeight: '500',
  },

  termsText: {
    fontSize: FontSizes.sm,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 18,
  },
});