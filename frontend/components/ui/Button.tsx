import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { FontSizes } from '../../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradient?: boolean; // New prop for gradient support
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
  gradient = false,
}) => {
  const buttonHeight = size === 'small' ? 40 : size === 'medium' ? 48 : 56;
  const fontSize = size === 'small' ? FontSizes.sm : size === 'medium' ? FontSizes.md : FontSizes.lg;

  const isDisabled = disabled || loading;

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return ButtonStyles.primaryButton;
      case 'secondary':
        return ButtonStyles.secondaryButton;
      case 'outline':
        return ButtonStyles.outlineButton;
      case 'ghost':
        return ButtonStyles.ghostButton;
      default:
        return ButtonStyles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return ButtonStyles.primaryButtonText;
      case 'secondary':
        return ButtonStyles.secondaryButtonText;
      case 'outline':
        return ButtonStyles.outlineButtonText;
      case 'ghost':
        return ButtonStyles.ghostButtonText;
      default:
        return ButtonStyles.primaryButtonText;
    }
  };

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#FF5CA0' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <Text style={[getTextStyle(), { fontSize }, textStyle]}>
          {title}
        </Text>
      )}
    </>
  );

  if (gradient && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[
          ButtonStyles.button,
          getButtonStyle(),
          { height: buttonHeight, backgroundColor: 'transparent', opacity: isDisabled ? 0.6 : 1 },
          style,
        ]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#C04AFF', '#FF5CA0']} // Purple to pink gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            flexDirection: 'row',
            height: buttonHeight,
          }}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        ButtonStyles.button,
        getButtonStyle(),
        { height: buttonHeight, opacity: isDisabled ? 0.6 : 1 },
        style,
      ]}
      activeOpacity={0.8}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};