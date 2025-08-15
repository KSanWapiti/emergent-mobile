import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
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

  const handleCrop = async () => {
    try {
      setCropping(true);
      
      // Get image dimensions first
      const imageInfo = await new Promise<{width: number, height: number}>((resolve, reject) => {
        Image.getSize(
          imageUri,
          (width, height) => resolve({ width, height }),
          reject
        );
      });

      // Calculate crop dimensions to maintain aspect ratio
      const targetAspectRatio = aspectRatio[0] / aspectRatio[1];
      const imageAspectRatio = imageInfo.width / imageInfo.height;
      
      let cropWidth, cropHeight, originX, originY;
      
      if (imageAspectRatio > targetAspectRatio) {
        // Image is wider than target aspect ratio
        cropHeight = imageInfo.height;
        cropWidth = cropHeight * targetAspectRatio;
        originX = (imageInfo.width - cropWidth) / 2;
        originY = 0;
      } else {
        // Image is taller than target aspect ratio
        cropWidth = imageInfo.width;
        cropHeight = cropWidth / targetAspectRatio;
        originX = 0;
        originY = (imageInfo.height - cropHeight) / 2;
      }

      // Crop the image
      const result = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          {
            crop: {
              originX,
              originY,
              width: cropWidth,
              height: cropHeight,
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
          
          <View style={styles.previewContainer}>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.previewImage}
              resizeMode="contain"
            />
            <Text style={styles.instructions}>
              L'image sera automatiquement recadrée au format optimal
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.cropButton]} 
              onPress={handleCrop}
              disabled={cropping}
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
    maxWidth: 400,
    maxHeight: screenHeight * 0.8,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  previewImage: {
    width: 200,
    height: 250,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  instructions: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  buttonContainer: {
    gap: Spacing.md,
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