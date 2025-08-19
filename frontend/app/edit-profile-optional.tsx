import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { NavigationHeader } from '../components/ui/NavigationHeader';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { GradientButton } from '../components/ui/GradientButton';
import { Toast } from '../components/ui/Toast';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

interface OptionalData {
  ethnicType: string;
  religion: string;
  hairColor: string;
  hairLength: string;
  socialCategory: string;
  smoker: string;
  children: string;
  languages: string;
}

export default function EditProfileOptional() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  
  const [optionalData, setOptionalData] = useState<OptionalData>({
    ethnicType: 'Latino-américain',
    religion: 'Catholique',
    hairColor: 'Brun',
    hairLength: 'Court',
    socialCategory: 'Designer',
    smoker: 'Non-fumeur',
    children: '0',
    languages: 'Anglais, Portugais'
  });

  const ethnicOptions = ['Européen', 'Afro-américain', 'Latino-américain', 'Asiatique', 'Métis', 'Autre'];
  const religionOptions = ['Catholique', 'Protestant', 'Musulman', 'Juif', 'Bouddhiste', 'Hindou', 'Agnostique', 'Athée', 'Autre'];
  const hairColorOptions = ['Blond', 'Brun', 'Châtain', 'Roux', 'Noir', 'Gris', 'Blanc'];
  const hairLengthOptions = ['Court', 'Mi-long', 'Long', 'Très long', 'Chauve'];
  const socialCategoryOptions = ['Cadre', 'Employé', 'Ouvrier', 'Artisan', 'Commerçant', 'Profession libérale', 'Fonctionnaire', 'Étudiant', 'Retraité', 'Sans emploi', 'Autre'];
  const smokerOptions = ['Non-fumeur', 'Fumeur occasionnel', 'Fumeur régulier'];
  const childrenOptions = ['0', '1', '2', '3', '4+'];

  const handleSave = () => {
    // Save optional data logic here
    setToastMessage('Informations optionnelles mises à jour !');
    setToastVisible(true);
    
    // Navigate back after a delay
    setTimeout(() => {
      router.back();
    }, 1500);
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
          {/* Optional Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations optionnelles</Text>
            
            {/* Ethnic Type */}
            {renderDropdown(
              'Type ethnique',
              optionalData.ethnicType,
              ethnicOptions,
              (value) => setOptionalData(prev => ({ ...prev, ethnicType: value }))
            )}

            {/* Religion */}
            {renderDropdown(
              'Religion',
              optionalData.religion,
              religionOptions,
              (value) => setOptionalData(prev => ({ ...prev, religion: value }))
            )}

            {/* Hair Color */}
            {renderDropdown(
              'Couleur des cheveux',
              optionalData.hairColor,
              hairColorOptions,
              (value) => setOptionalData(prev => ({ ...prev, hairColor: value }))
            )}

            {/* Hair Length */}
            {renderDropdown(
              'Longueur des cheveux',
              optionalData.hairLength,
              hairLengthOptions,
              (value) => setOptionalData(prev => ({ ...prev, hairLength: value }))
            )}

            {/* Social Category */}
            {renderDropdown(
              'Cat. sociaux-professionnel',
              optionalData.socialCategory,
              socialCategoryOptions,
              (value) => setOptionalData(prev => ({ ...prev, socialCategory: value }))
            )}

            {/* Smoker */}
            {renderDropdown(
              'Fumeur',
              optionalData.smoker,
              smokerOptions,
              (value) => setOptionalData(prev => ({ ...prev, smoker: value }))
            )}

            {/* Children */}
            {renderDropdown(
              'Enfants',
              optionalData.children,
              childrenOptions,
              (value) => setOptionalData(prev => ({ ...prev, children: value }))
            )}

            {/* Languages */}
            {renderDropdown(
              'Langues parlées',
              optionalData.languages,
              ['Français', 'Anglais', 'Espagnol', 'Italien', 'Allemand', 'Portugais', 'Arabe', 'Chinois', 'Japonais', 'Russe', 'Autre'],
              (value) => setOptionalData(prev => ({ ...prev, languages: value }))
            )}
          </View>

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
  saveButton: {
    marginTop: Spacing.lg,
  },
});