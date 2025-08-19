import React from 'react';
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
import { Colors, FontSizes, Spacing } from '../constants/Colors';

interface InfoSection {
  id: number;
  title: string;
  content: string;
}

export default function Info() {
  const infoSections: InfoSection[] = [
    {
      id: 1,
      title: "Créer son profil",
      content: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue, ornare vehicula aliquam."
    },
    {
      id: 2,
      title: "Explorer les profils",
      content: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue, ornare vehicula aliquam."
    },
    {
      id: 3,
      title: "Match",
      content: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue, ornare vehicula aliquam."
    },
    {
      id: 4,
      title: "Activités",
      content: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue, ornare vehicula aliquam."
    },
    {
      id: 5,
      title: "Discussion",
      content: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue, ornare vehicula aliquam."
    }
  ];

  const renderInfoSection = (section: InfoSection) => (
    <View key={section.id} style={styles.infoSection}>
      <Text style={styles.sectionNumber}>{section.id}.</Text>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.sectionText}>{section.content}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader showMenu={true} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Info</Text>
          <Text style={styles.headerSubtitle}>Tout savoir sur Tyte.</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {infoSections.map(renderInfoSection)}
        </View>
      </ScrollView>

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
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
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
  infoSection: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
    alignItems: 'flex-start',
  },
  sectionNumber: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginRight: Spacing.md,
    marginTop: 2,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  sectionText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    lineHeight: 22,
    textAlign: 'justify',
  },
});