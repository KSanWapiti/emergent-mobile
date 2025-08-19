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
import { Colors, FontSizes, Spacing } from '../constants/Colors';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['1']); // Premier item ouvert par défaut

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: "Lorem ipsum dolor sit amet consectetur. Mattis aliquet vitae nunc mattis dictumst egestas?",
      answer: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue. Ornare vehicula aliquam viverra proin convallis dignissim. Nunc semper dictum fermentum duis. Euismod ac elementum amet sit."
    },
    {
      id: '2',
      question: "Lorem ipsum dolor sit amet consectetur. Mattis aliquet vitae nunc mattis dictumst egestas?",
      answer: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue. Ornare vehicula aliquam viverra proin convallis dignissim."
    },
    {
      id: '3',
      question: "Lorem ipsum dolor sit amet consectetur. Mattis aliquet vitae nunc mattis dictumst egestas?",
      answer: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue. Ornare vehicula aliquam viverra proin convallis dignissim."
    },
    {
      id: '4',
      question: "Lorem ipsum dolor sit amet consectetur. Mattis aliquet vitae nunc mattis dictumst egestas?",
      answer: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue. Ornare vehicula aliquam viverra proin convallis dignissim."
    },
    {
      id: '5',
      question: "Lorem ipsum dolor sit amet consectetur. Mattis aliquet vitae nunc mattis dictumst egestas?",
      answer: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue. Ornare vehicula aliquam viverra proin convallis dignissim."
    },
    {
      id: '6',
      question: "Lorem ipsum dolor sit amet consectetur. Mattis aliquet vitae nunc mattis dictumst egestas?",
      answer: "Lorem ipsum dolor sit amet consectetur. Sed consequat mattis aliquet sociis. Interdum vel lectus arcu volutpat dictum velit. Tortor neque interdum senectus vestibulum. Volutpat vel auctor pretium massa augue. Ornare vehicula aliquam viverra proin convallis dignissim."
    }
  ];

  const toggleExpanded = (itemId: string) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(prev => prev.filter(id => id !== itemId));
    } else {
      setExpandedItems(prev => [...prev, itemId]);
    }
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  const renderFAQItem = (item: FAQItem) => (
    <View key={item.id} style={styles.faqItem}>
      <TouchableOpacity 
        style={styles.questionContainer}
        onPress={() => toggleExpanded(item.id)}
      >
        <Text style={styles.question}>{item.question}</Text>
        <View style={styles.arrowContainer}>
          <Text style={[
            styles.arrow, 
            isExpanded(item.id) ? styles.arrowUp : styles.arrowDown
          ]}>
            {isExpanded(item.id) ? '▲' : '▼'}
          </Text>
        </View>
      </TouchableOpacity>
      
      {isExpanded(item.id) && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      )}
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
          <Text style={styles.headerTitle}>FAQ</Text>
          <Text style={styles.headerSubtitle}>Tes questions, nos réponses.</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {faqItems.map(renderFAQItem)}
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
  faqItem: {
    marginBottom: Spacing.lg,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  question: {
    flex: 1,
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginRight: Spacing.md,
    lineHeight: 24,
  },
  arrowContainer: {
    padding: Spacing.sm,
  },
  arrow: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  arrowUp: {
    transform: [{ rotate: '0deg' }],
  },
  arrowDown: {
    transform: [{ rotate: '0deg' }],
  },
  answerContainer: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  answer: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    lineHeight: 22,
    textAlign: 'justify',
  },
});