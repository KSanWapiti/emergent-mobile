import { StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/Colors';

export const GlobalStyles = StyleSheet.create({
  // Layout Styles
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  
  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },

  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },

  // Typography Styles
  title: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  // Gradient title for special pages
  gradientTitle: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.md,
    // Note: This will be handled by a gradient text component since RN doesn't support gradient text directly
  },

  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },

  label: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },

  errorText: {
    fontSize: FontSizes.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
  },

  // Header Styles
  header: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },

  // Form Styles
  form: {
    flex: 1,
  },

  section: {
    marginBottom: Spacing.xl,
  },

  inputContainer: {
    marginBottom: Spacing.md,
  },

  // Button Styles
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  backButton: {
    flex: 1,
  },

  nextButton: {
    flex: 2,
  },

  // Center content
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Options/Selection Styles
  optionsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },

  optionsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
});