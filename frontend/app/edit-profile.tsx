import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { NavigationHeader } from '../components/ui/NavigationHeader';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { GradientButton } from '../components/ui/GradientButton';
import { Toast } from '../components/ui/Toast';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

interface ProfileData {
  name: string;
  firstName: string;
  height: string;
  gender: string;
  bodyType: string;
  city: string;
  hobbies: string;
  presentation: string;
}

export default function EditProfile() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Areas',
    firstName: 'Raphael',
    height: '184',
    gender: 'Homme',
    bodyType: 'Athlétique', 
    city: 'Paris',
    hobbies: 'Jeux en ligne, Randonnée, Lecture',
    presentation: 'Designer brésilien vivant en France. Passionné par les jeux vidéo, la nature et les échanges culturels. Toujours à la recherche de nouvelles inspirations créatives et de rencontres authentiques.'
  });

  const genderOptions = ['Homme', 'Femme', 'Autre'];
  const bodyTypeOptions = ['Mince', 'Athlétique', 'Normal', 'Corpulent'];
  const cityOptions = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Bordeaux'];

  const handleSave = () => {
    // Save profile data logic here
    setToastMessage('Profil mis à jour avec succès !');
    setToastVisible(true);
    
    // Navigate back to profile after a delay
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  const handleModifyPhotos = () => {
    router.push('/edit-profile-photos');
  };

  const handleEditOptionalInfo = () => {
    router.push('/edit-profile-optional');
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const renderDropdown = (
    label: string,
    value: string,
    options: string[],
    onSelect: (value: string) => void
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>{value}</Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>
    </View>
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
          <Text style={styles.headerTitle}>Editer mon profil</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Modify Photos Section */}
          <TouchableOpacity style={styles.modifyPhotosButton} onPress={handleModifyPhotos}>
            <Text style={styles.modifyPhotosText}>Modifier les photos du profil</Text>
          </TouchableOpacity>

          {/* Personal Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations personnelles</Text>
            
            {/* Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Nom</Text>
              <TextInput
                style={styles.textInput}
                value={profileData.name}
                onChangeText={(text) => setProfileData(prev => ({ ...prev, name: text }))}
                placeholder="Nom"
                placeholderTextColor={Colors.text.secondary}
              />
            </View>

            {/* First Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Prénom</Text>
              <TextInput
                style={styles.textInput}
                value={profileData.firstName}
                onChangeText={(text) => setProfileData(prev => ({ ...prev, firstName: text }))}
                placeholder="Prénom"
                placeholderTextColor={Colors.text.secondary}
              />
            </View>

            {/* Height */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Taille</Text>
              <TextInput
                style={styles.textInput}
                value={profileData.height}
                onChangeText={(text) => setProfileData(prev => ({ ...prev, height: text }))}
                placeholder="Taille (cm)"
                placeholderTextColor={Colors.text.secondary}
                keyboardType="numeric"
              />
            </View>

            {/* Gender */}
            {renderDropdown(
              'Genre',
              profileData.gender,
              genderOptions,
              (value) => setProfileData(prev => ({ ...prev, gender: value }))
            )}

            {/* Body Type */}
            {renderDropdown(
              'Corpulence',
              profileData.bodyType,
              bodyTypeOptions,
              (value) => setProfileData(prev => ({ ...prev, bodyType: value }))
            )}

            {/* City */}
            {renderDropdown(
              'Ville',
              profileData.city,
              cityOptions,
              (value) => setProfileData(prev => ({ ...prev, city: value }))
            )}

            {/* Hobbies */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Loisirs</Text>
              <TextInput
                style={styles.textInput}
                value={profileData.hobbies}
                onChangeText={(text) => setProfileData(prev => ({ ...prev, hobbies: text }))}
                placeholder="Vos loisirs"
                placeholderTextColor={Colors.text.secondary}
              />
            </View>

            {/* Presentation */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Présentation libre</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={profileData.presentation}
                onChangeText={(text) => setProfileData(prev => ({ ...prev, presentation: text }))}
                placeholder="Présentez-vous en quelques mots..."
                placeholderTextColor={Colors.text.secondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Optional Information Button */}
          <TouchableOpacity style={styles.optionalInfoButton} onPress={handleEditOptionalInfo}>
            <Text style={styles.optionalInfoText}>Modifier les informations optionnelles</Text>
            <Text style={styles.optionalInfoArrow}>→</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <GradientButton
            title="Enregistrer"
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
  modifyPhotosButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  modifyPhotosText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  fieldContainer: {
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 100,
    maxHeight: 150,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 18,
    color: Colors.text.secondary,
  },
  optionalInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  optionalInfoText: {
    fontSize: FontSizes.md,
    color: Colors.secondary,
    fontWeight: '500',
  },
  optionalInfoArrow: {
    fontSize: 18,
    color: Colors.secondary,
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
});