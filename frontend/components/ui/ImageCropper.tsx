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
import DynamicImageCrop from 'expo-dynamic-image-crop';
import * as ImageManipulator from 'expo-image-manipulator';
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
  const [cropping, setCropping] = useState(false);
  const [cropData, setCropData] = useState<any>(null);

  const handleCrop = async () => {
    if (!cropData) {
      Alert.alert('Erreur', 'Veuillez ajuster le cadrage avant de continuer');
      return;
    }

    try {
      setCropping(true);
      
      const { originX, originY, width, height } = cropData;
      
      // Use Expo Image Manipulator to crop the image
      const result = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          {
            crop: {
              originX,
              originY,
              width,
              height,
            },
          },
        ],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      if (result.base64) {
        const base64Image = `data:image/jpeg;base64,${result.base64}`;
        onCropComplete(base64Image);
        onClose();
      }
    } catch (error) {
      console.log('Crop error:', error);
      Alert.alert('Erreur', 'Impossible de recadrer l\'image');
    } finally {
      setCropping(false);
    }
  };

  const handleCropDataChange = (data: any) => {
    setCropData(data);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Recadrer la photo</Text>
          
          <View style={styles.cropContainer}>
            <DynamicImageCrop
              uri={imageUri}
              fixedAspectRatio={aspectRatio[0] / aspectRatio[1]}
              onCropDataChange={handleCropDataChange}
              style={styles.cropView}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.cropButton]} 
              onPress={handleCrop}
              disabled={cropping || !cropData}
            >
              <Text style={[styles.actionButtonText, styles.cropButtonText]}>
                {cropping ? 'Recadrage...' : '✂️ Recadrer'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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