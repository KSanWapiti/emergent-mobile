import React, { forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { InputStyles } from '../../styles/InputStyles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  required?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, containerStyle, inputStyle, labelStyle, required, ...props }, ref) => {
    const hasError = !!error;

    return (
      <View style={[InputStyles.container, containerStyle]}>
        {label && (
          <Text style={[InputStyles.label, labelStyle]}>
            {label}
            {required && <Text style={InputStyles.required}> *</Text>}
          </Text>
        )}
        <TextInput
          ref={ref}
          style={[
            InputStyles.input,
            hasError && InputStyles.inputError,
            inputStyle,
          ]}
          placeholderTextColor="#777777"
          autoCapitalize="none"
          {...props}
        />
        {hasError && <Text style={InputStyles.errorText}>{error}</Text>}
      </View>
    );
  }
);