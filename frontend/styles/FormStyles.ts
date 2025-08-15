import { StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/Colors';

export const FormStyles = StyleSheet.create({
  // Main containers
  fullContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  
  keyboardContainer: {
    flex: 1,
  },

  // Progress bar styles
  progressHeader: {
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },

  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 2,
  },

  // Step form specific
  stepContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  stepContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },

  stepHeader: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },

  stepForm: {
    flex: 1,
    paddingBottom: Spacing.xl,
  },

  stepFooter: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },

  // Typography
  gradientTitle: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },

  stepTitle: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  stepSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Button layouts
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  backButton: {
    flex: 1,
  },

  nextButton: {
    flex: 2,
  },

  fullWidthButton: {
    width: '100%',
  },

  // Form rows and columns
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  formColumn: {
    flex: 1,
  },
  
  // Dropdown styles
  dropdownContainer: {
    marginBottom: Spacing.sm,
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  dropdownSelectorError: {
    borderColor: Colors.error,
  },
  dropdownText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    flex: 1,
  },
  dropdownPlaceholder: {
    color: Colors.text.secondary,
  },
  dropdownChevron: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  
  // Text input styles
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: Spacing.md,
  },
  
  // Section styles
  sectionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },

  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },

  sectionTitleMedium: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },

  // Option layouts
  optionsContainer: {
    gap: Spacing.md,
  },

  optionsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },

  // Error text
  errorText: {
    fontSize: FontSizes.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
  },

  // Radio button styles
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },

  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.medium,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioCircleSelected: {
    borderColor: Colors.secondary,
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.secondary,
  },

  radioLabel: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    flex: 1,
  },
});