import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Colors, Spacing, BorderRadius, FontSizes } from '../../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonHeight = size === 'small' ? 40 : size === 'medium' ? 48 : 56;
  const fontSize = size === 'small' ? FontSizes.sm : size === 'medium' ? FontSizes.md : FontSizes.lg;

  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[styles.button, { height: buttonHeight, opacity: isDisabled ? 0.6 : 1 }, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[Colors.primary.start, Colors.primary.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={[styles.primaryButtonText, { fontSize }, textStyle]}>
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        variant === 'secondary' ? styles.secondaryButton : styles.outlineButton,
        { height: buttonHeight, opacity: isDisabled ? 0.6 : 1 },
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'secondary' ? '#FFFFFF' : Colors.secondary} 
          size="small" 
        />
      ) : (
        <Text
          style={[
            variant === 'secondary' ? styles.secondaryButtonText : styles.outlineButtonText,
            { fontSize },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    minHeight: 44, // Minimum touch target for accessibility
  },
  gradientButton: {
    flex: 1,
    width: '100%',
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    backgroundColor: 'transparent',
  },
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
});