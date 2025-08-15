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
import ImagePicker from 'react-native-image-crop-picker';
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
      
      // Use the image crop picker to crop the image
      const croppedImage = await ImagePicker.openCropper({
        path: imageUri,
        width: aspectRatio[0] * 100,
        height: aspectRatio[1] * 100,
        cropping: true,
        includeBase64: true,
        mediaType: 'photo',
        compressImageQuality: 0.8,
      });

      if (croppedImage.data) {
        const base64Image = `data:image/jpeg;base64,${croppedImage.data}`;
        onCropComplete(base64Image);
        onClose();
      }
    } catch (error) {
      console.log('Crop cancelled or failed:', error);
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
          
          <Text style={styles.instructions}>
            Appuyez sur "Recadrer" pour ajuster votre photo
          </Text>
          
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
    width: screenWidth * 0.85,
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  instructions: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 20,
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