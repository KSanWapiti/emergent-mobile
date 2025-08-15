import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { ImageManipulator } from 'expo-image-crop';
import { Colors, Spacing, BorderRadius, FontSizes } from '../../constants/Colors';

interface ImageCropperProps {
  visible: boolean;
  imageUri: string;
  onClose: () => void;
  onCropComplete: (croppedImageUri: string) => void;
  aspectRatio?: [number, number];
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ImageCropper: React.FC<ImageCropperProps> = ({
  visible,
  imageUri,
  onClose,
  onCropComplete,
  aspectRatio = [3, 4],
}) => {
  const handleCropComplete = (croppedImage: { uri: string }) => {
    if (croppedImage && croppedImage.uri) {
      onCropComplete(croppedImage.uri);
    }
    onClose();
  };

  const handleToggleModal = () => {
    onClose();
  };

  return (
    <ImageManipulator
      photo={{ uri: imageUri }}
      isVisible={visible}
      onPictureChoosed={handleCropComplete}
      onToggleModal={handleToggleModal}
      btnTexts={{
        crop: 'Recadrer',
        rotate: 'Pivoter',
        done: 'Terminé',
        processing: 'Traitement...',
      }}
    />
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: screenWidth * 0.9,
    height: screenHeight * 0.8,
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  cropContainer: {
    flex: 1,
    marginVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  cropView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    gap: Spacing.md,
    paddingTop: Spacing.lg,
  },
  actionButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  cropButton: {
    backgroundColor: Colors.secondary,
  },
  actionButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '500',
  },
  cropButtonText: {
    color: '#FFFFFF',
  },
  cancelButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
});