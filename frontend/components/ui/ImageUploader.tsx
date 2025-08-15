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
import { Colors, Spacing, BorderRadius, FontSizes } from '../../constants/Colors';

interface ImageUploaderProps {
  label: string;
  placeholder: string;
  value?: string; // base64 image
  onImageChange: (base64Image: string | null) => void;
  style?: any;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  placeholder,
  value,
  onImageChange,
  style,
}) => {
  const [showActions, setShowActions] = useState(false);

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
        allowsEditing: true,
        aspect: [3, 4], // Portrait aspect ratio
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
        allowsEditing: true,
        aspect: [3, 4],
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

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity
        style={[styles.imageContainer, !value && styles.emptyContainer]}
        onPress={handleImagePress}
        activeOpacity={0.8}
      >
        {value ? (
          <Image source={{ uri: value }} style={styles.image} />
        ) : (
          <View style={styles.placeholderContainer}>
            <View style={styles.cameraIcon}>
              <Text style={styles.cameraIconText}>📷</Text>
            </View>
            <Text style={styles.placeholderText}>{placeholder}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Actions Modal */}
      <Modal
        visible={showActions}
        transparent
        animationType="slide"
        onRequestClose={() => setShowActions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options de photo</Text>
            
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <Text style={styles.actionButtonText}>📷 Changer de photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
              <Text style={styles.actionButtonText}>🔄 Recadrer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={deleteImage}>
              <Text style={[styles.actionButtonText, styles.deleteButtonText]}>🗑️ Supprimer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowActions(false)}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
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
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cameraIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cameraIconText: {
    fontSize: 24,
  },
  placeholderText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  actionButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.secondary,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  deleteButtonText: {
    color: Colors.error,
  },
  cancelButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  cancelButtonText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
});