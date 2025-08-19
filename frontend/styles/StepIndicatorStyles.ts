import { StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes } from '../constants/Colors';

export const StepIndicatorStyles = StyleSheet.create({
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
    backgroundColor: Colors.primary.start,
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