import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { NavigationHeader } from '../components/ui/NavigationHeader';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { GradientButton } from '../components/ui/GradientButton';
import { Toast } from '../components/ui/Toast';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

interface ProfilePhoto {
  id: string;
  uri: string;
  isMain: boolean;
}

export default function EditProfilePhotos() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  
  const [photos, setPhotos] = useState<ProfilePhoto[]>([
    {
      id: '1',
      uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      isMain: true
    },
    {
      id: '2', 
      uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      isMain: false
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      isMain: false
    }
  ]);

  const maxPhotos = 6;

  const handleAddPhoto = () => {
    if (photos.length >= maxPhotos) {
      Alert.alert('Limite atteinte', `Vous pouvez ajouter au maximum ${maxPhotos} photos.`);
      return;
    }
    
    Alert.alert(
      'Ajouter une photo',
      'Choisissez une option',
      [
        { text: 'Caméra', onPress: () => console.log('Open camera') },
        { text: 'Galerie', onPress: () => console.log('Open gallery') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const handleDeletePhoto = (photoId: string) => {
    const photoToDelete = photos.find(p => p.id === photoId);
    if (photoToDelete?.isMain && photos.length > 1) {
      Alert.alert(
        'Photo principale',
        'Vous ne pouvez pas supprimer votre photo principale. Définissez d\'abord une autre photo comme principale.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Supprimer la photo',
      'Êtes-vous sûr de vouloir supprimer cette photo ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setPhotos(prev => prev.filter(p => p.id !== photoId));
          }
        }
      ]
    );
  };

  const handleSetMainPhoto = (photoId: string) => {
    setPhotos(prev => prev.map(photo => ({
      ...photo,
      isMain: photo.id === photoId
    })));
    
    setToastMessage('Photo principale mise à jour !');
    setToastVisible(true);
  };

  const handleSave = () => {
    setToastMessage('Photos sauvegardées avec succès !');
    setToastVisible(true);
    
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const renderPhoto = (photo: ProfilePhoto, index: number) => (
    <View key={photo.id} style={styles.photoContainer}>
      <Image source={{ uri: photo.uri }} style={styles.photo} />
      
      {photo.isMain && (
        <View style={styles.mainBadge}>
          <Text style={styles.mainBadgeText}>Principale</Text>
        </View>
      )}
      
      <View style={styles.photoActions}>
        {!photo.isMain && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleSetMainPhoto(photo.id)}
          >
            <Text style={styles.actionButtonText}>Principale</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeletePhoto(photo.id)}
        >
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddPhotoSlot = () => (
    <TouchableOpacity style={styles.addPhotoContainer} onPress={handleAddPhoto}>
      <View style={styles.addPhotoPlus}>
        <Text style={styles.addPhotoPlusText}>+</Text>
      </View>
      <Text style={styles.addPhotoText}>Ajouter une photo</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader notificationsCount={5} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Modifier les photos</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.instructions}>
            Ajoutez jusqu'à {maxPhotos} photos. La première photo sera votre photo principale.
          </Text>
          
          <View style={styles.photosGrid}>
            {photos.map((photo, index) => renderPhoto(photo, index))}
            
            {photos.length < maxPhotos && renderAddPhotoSlot()}
          </View>

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>Conseils pour de meilleures photos :</Text>
            <Text style={styles.tipsText}>• Utilisez des photos récentes et de bonne qualité</Text>
            <Text style={styles.tipsText}>• Montrez votre visage clairement</Text>
            <Text style={styles.tipsText}>• Variez les angles et les environnements</Text>
            <Text style={styles.tipsText}>• Évitez les filtres excessifs</Text>
          </View>

          <GradientButton
            title="Enregistrer les modifications"
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>

      {/* Toast */}
      <Toast 
        message={toastMessage}
        type="success"
        visible={toastVisible}
        onHide={hideToast}
      />

      <BottomNavigation activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    padding: Spacing.sm,
  },
  backArrow: {
    fontSize: 24,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  instructions: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  photoContainer: {
    width: '48%',
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: Spacing.sm,
  },
  mainBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  mainBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 20,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.secondary,
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  deleteButton: {
    borderColor: '#FF5CA0',
  },
  deleteButtonText: {
    color: '#FF5CA0',
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  addPhotoContainer: {
    width: '48%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  addPhotoPlus: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  addPhotoPlusText: {
    fontSize: 24,
    color: Colors.text.secondary,
    fontWeight: 'bold',
  },
  addPhotoText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  tips: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  tipsTitle: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  tipsText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
    lineHeight: 20,
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
});