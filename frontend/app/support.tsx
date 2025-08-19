import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { NavigationHeader } from '../components/ui/NavigationHeader';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { GradientButton } from '../components/ui/GradientButton';
import { Toast } from '../components/ui/Toast';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

interface ContactOption {
  label: string;
  value: string;
}

export default function Support() {
  const [selectedReason, setSelectedReason] = useState<string>('email');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const contactReasons: ContactOption[] = [
    { label: 'Email', value: 'email' },
    { label: 'Problème technique', value: 'technical' },
    { label: 'Signalement', value: 'report' },
    { label: 'Suggestion', value: 'suggestion' },
    { label: 'Autre', value: 'other' },
  ];

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Simulate message sending
    setToastMessage('Message envoyé avec succès !');
    setToastVisible(true);
    
    // Reset form
    setName('');
    setMessage('');
  };

  const handleAttachImage = () => {
    Alert.alert('Fonction à venir', 'La fonctionnalité de joindre une image sera bientôt disponible.');
  };

  const handleGoToFAQ = () => {
    router.push('/faq');
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader showMenu={true} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Support</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* FAQ Suggestion */}
          <View style={styles.faqSuggestion}>
            <Text style={styles.faqText}>
              Avez-vous regardé si votre réponse ne se trouve pas dans la FAQ ?
            </Text>
            <TouchableOpacity style={styles.faqButton} onPress={handleGoToFAQ}>
              <Text style={styles.faqButtonText}>FAQ</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Form */}
          <View style={styles.formContainer}>
            {/* Contact Reason Dropdown */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Motif du contact</Text>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>
                  {contactReasons.find(reason => reason.value === selectedReason)?.label}
                </Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </View>
            </View>

            {/* Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Nom</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Votre nom complet"
                placeholderTextColor={Colors.text.secondary}
              />
            </View>

            {/* Message Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Votre message</Text>
              <TextInput
                style={[styles.textInput, styles.messageInput]}
                value={message}
                onChangeText={setMessage}
                placeholder="Décrivez votre demande en détail..."
                placeholderTextColor={Colors.text.secondary}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            {/* File Attachment */}
            <View style={styles.fieldContainer}>
              <Text style={styles.attachmentText}>
                Ajouter un fichier si besoin !
              </Text>
              <TouchableOpacity style={styles.attachButton} onPress={handleAttachImage}>
                <Text style={styles.attachButtonText}>📎 Joindre une image</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <GradientButton
              title="Envoyer le message"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>
        </View>
      </ScrollView>

      {/* Toast */}
      <Toast 
        message={toastMessage}
        type="success"
        visible={toastVisible}
        onHide={hideToast}
      />

      <BottomNavigation />
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
  faqSuggestion: {
    backgroundColor: '#F8F9FA',
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  faqText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 22,
  },
  faqButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  faqButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  formContainer: {
    gap: Spacing.lg,
  },
  fieldContainer: {
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  dropdownContainer: {
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
    fontSize: 14,
    color: Colors.text.secondary,
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
  messageInput: {
    minHeight: 120,
    maxHeight: 180,
  },
  attachmentText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  attachButton: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  attachButtonText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
  },
  submitButton: {
    marginTop: Spacing.lg,
  },
});