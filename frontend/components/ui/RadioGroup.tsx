import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { FormStyles } from '../../styles/FormStyles';
import { Colors, Spacing, BorderRadius, FontSizes } from '../../constants/Colors';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
  isDropdown?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onValueChange,
  error,
  isDropdown = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (isDropdown) {
    const selectedOption = options.find(option => option.value === selectedValue);
    const displayText = selectedOption?.label || options[0]?.label || 'Sélectionnez...';

    return (
      <View style={FormStyles.dropdownContainer}>
        <TouchableOpacity
          style={[FormStyles.dropdownSelector, error && FormStyles.dropdownSelectorError]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={[
            FormStyles.dropdownText,
            !selectedValue && FormStyles.dropdownPlaceholder
          ]}>
            {displayText}
          </Text>
          <Text style={FormStyles.dropdownChevron}>▼</Text>
        </TouchableOpacity>

        {error && <Text style={FormStyles.errorText}>{error}</Text>}

        <Modal
          visible={isModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={dropdownStyles.modalOverlay}>
            <View style={dropdownStyles.modalContent}>
              <View style={dropdownStyles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={dropdownStyles.closeButton}
                >
                  <Text style={dropdownStyles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={dropdownStyles.optionsList}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      dropdownStyles.optionItem,
                      selectedValue === option.value && dropdownStyles.selectedOption
                    ]}
                    onPress={() => {
                      onValueChange(option.value);
                      setIsModalVisible(false);
                    }}
                  >
                    <Text style={[
                      dropdownStyles.optionText,
                      selectedValue === option.value && dropdownStyles.selectedOptionText
                    ]}>
                      {option.label}
                    </Text>
                    {selectedValue === option.value && (
                      <Text style={dropdownStyles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={FormStyles.optionsContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={FormStyles.radioOption}
          onPress={() => onValueChange(option.value)}
          activeOpacity={0.7}
        >
          <View style={[
            FormStyles.radioCircle,
            selectedValue === option.value && FormStyles.radioCircleSelected
          ]}>
            {selectedValue === option.value && (
              <View style={FormStyles.radioInner} />
            )}
          </View>
          <Text style={FormStyles.radioLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      {error && <Text style={FormStyles.errorText}>{error}</Text>}
    </View>
  );
};

const dropdownStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    width: '90%',
    maxHeight: '70%',
    padding: Spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Spacing.lg,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
  },
  selectedOption: {
    backgroundColor: Colors.secondary + '20',
  },
  optionText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    flex: 1,
  },
  selectedOptionText: {
    color: Colors.secondary,
    fontWeight: '500',
  },
  checkmark: {
    fontSize: FontSizes.md,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
});