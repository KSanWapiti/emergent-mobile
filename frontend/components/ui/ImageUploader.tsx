import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageCropper } from './ImageCropper';
import { Colors, Spacing, BorderRadius, FontSizes } from '../../constants/Colors';

interface ImageUploaderProps {
  label: string;
  placeholder: string;
  value?: string; // base64 image/video
  onImageSelected: (base64Media: string | null) => void;
  onImageChange: (base64Media: string | null) => void; // Legacy prop for backwards compatibility
  style?: any;
  isPortrait?: boolean; // To determine circular or rectangular display
  isVideo?: boolean; // To handle video uploads
  error?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  placeholder,
  value,
  onImageSelected,
  onImageChange, // Legacy support
  style,
  isPortrait = false,
  isVideo = false,
  error,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  // Use the new prop if provided, fallback to legacy prop
  const handleImageChange = onImageSelected || onImageChange;

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission nécessaire',
        'Nous avons besoin de la permission pour accéder à vos photos.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // We'll do custom cropping
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        onImageChange(base64Image);
        setShowActions(false);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sélectionner l\'image');
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission nécessaire',
        'Nous avons besoin de la permission pour utiliser la caméra.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        onImageChange(base64Image);
        setShowActions(false);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de prendre la photo');
    }
  };

  const handleImagePress = () => {
    if (value) {
      setShowActions(true);
    } else {
      pickImage();
    }
  };

  const deleteImage = () => {
    onImageChange(null);
    setShowActions(false);
  };

  const handleCrop = () => {
    setShowActions(false);
    setShowCropper(true);
  };

  const handleCropComplete = (croppedImage: string) => {
    onImageChange(croppedImage);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageRow}>
        <TouchableOpacity
          style={[
            styles.imageContainer,
            isPortrait ? styles.circularContainer : styles.rectangularContainer,
            !value && styles.emptyContainer
          ]}
          onPress={handleImagePress}
          activeOpacity={0.8}
        >
          {value ? (
            <Image 
              source={{ uri: value }} 
              style={[
                styles.image,
                isPortrait ? styles.circularImage : styles.rectangularImage
              ]} 
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <View style={styles.cameraIcon}>
                <Text style={styles.cameraIconText}>📷</Text>
              </View>
              <Text style={styles.placeholderText}>{placeholder}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Action buttons when image is present */}
        {value && (
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionItem} onPress={pickImage}>
              <Text style={styles.actionIcon}>📷</Text>
              <Text style={styles.actionText}>Changer de photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem} onPress={handleCrop}>
              <Text style={styles.actionIcon}>🔄</Text>
              <Text style={styles.actionText}>Recadrer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionItem, styles.deleteAction]} onPress={deleteImage}>
              <Text style={styles.actionIcon}>🗑️</Text>
              <Text style={[styles.actionText, styles.deleteText]}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Image Cropper Modal */}
      {value && (
        <ImageCropper
          visible={showCropper}
          imageUri={value}
          onClose={() => setShowCropper(false)}
          onCropComplete={handleCropComplete}
          aspectRatio={isPortrait ? [1, 1] : [3, 4]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.lg,
  },
  imageContainer: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  circularContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  rectangularContainer: {
    width: 120,
    height: 160,
    borderRadius: BorderRadius.lg,
  },
  emptyContainer: {
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderStyle: 'dashed',
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  circularImage: {
    borderRadius: 60,
  },
  rectangularImage: {
    borderRadius: BorderRadius.lg,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cameraIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cameraIconText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flex: 1,
    gap: Spacing.md,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.sm,
    gap: Spacing.sm,
  },
  actionIcon: {
    fontSize: FontSizes.md,
  },
  actionText: {
    fontSize: FontSizes.sm,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  deleteAction: {
    backgroundColor: '#FEE2E2',
  },
  deleteText: {
    color: Colors.error,
  },
});