import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { NavigationHeader } from '../components/ui/NavigationHeader';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { Toast } from '../components/ui/Toast';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

interface Message {
  id: string;
  name: string;
  avatar: string;
  timeAgo: string;
  type: 'message' | 'like';
  content: string;
  isRead: boolean;
  actions?: ('accept' | 'later' | 'decline')[];
}

type TabType = 'messages' | 'invitations';

export default function Messages() {
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'Camille',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c96e1d0b?w=100&h=100&fit=crop&crop=face',
      timeAgo: '10 min',
      type: 'message',
      content: 'Salut ! Je vois que tu es de Toulouse... C\'est pas si loin finalement',
      isRead: false,
      actions: ['accept', 'later', 'decline']
    },
    {
      id: '2',
      name: 'Élodie',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      timeAgo: '10 min',
      type: 'like',
      content: 'Vous a liké.\nSouhaitez-vous engager la conversation ?',
      isRead: false,
      actions: ['later', 'decline']
    },
    {
      id: '3',
      name: 'Manon', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      timeAgo: '10 min',
      type: 'message',
      content: 'Bon, j\'ai relu ton profil et je confirme : t\'as l\'air trop cool...',
      isRead: false,
      actions: ['later', 'decline']
    },
    {
      id: '4',
      name: 'Anaïs',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      timeAgo: '1h40',
      type: 'message',
      content: 'J\'ai eu une journée de dingue, mais j\'voulais quand même t\'écrire un petit...',
      isRead: false,
      actions: ['later', 'decline']
    }
  ]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const handleAction = (messageId: string, action: 'accept' | 'later' | 'decline', userName: string) => {
    if (action === 'accept') {
      // Handle accept action
      showToast(`Discussion avec ${userName} engagée`, 'success');
      // Remove message from list or mark as accepted
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } else if (action === 'decline') {
      // Handle decline action
      showToast(`Invitat. de ${userName} supprimée`, 'error');
      // Remove message from list
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } else if (action === 'later') {
      // Handle later action - maybe just mark as read
      console.log(`${userName} - Plus tard`);
    }
  };

  const handleProcessAllMessages = () => {
    showToast('Traitez tous les messages pour commencer la discussion.', 'success');
  };

  const getMessagesCount = () => messages.length;
  const getInvitationsCount = () => 4; // Mock data

  const renderMessage = (message: Message) => (
    <View key={message.id} style={styles.messageCard}>
      <Image source={{ uri: message.avatar }} style={styles.avatar} />
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{message.name}</Text>
          <Text style={styles.timeAgo}>- {message.timeAgo}</Text>
        </View>
        
        <Text style={styles.messageText}>{message.content}</Text>
        
        {message.id === '1' && (
          <View style={styles.processAllHint}>
            <Text style={styles.processAllText}>👁 Traitez tous les messages pour commencer la discussion.</Text>
          </View>
        )}
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {message.actions?.includes('accept') && (
            <TouchableOpacity 
              style={styles.acceptButton}
              onPress={() => handleAction(message.id, 'accept', message.name)}
            >
              <Text style={styles.acceptButtonText}>👋 Oui</Text>
            </TouchableOpacity>
          )}
          
          {message.actions?.includes('later') && (
            <TouchableOpacity 
              style={styles.laterButton}
              onPress={() => handleAction(message.id, 'later', message.name)}
            >
              <Text style={styles.laterButtonText}>👁 Plus tard</Text>
            </TouchableOpacity>
          )}
          
          {message.actions?.includes('decline') && (
            <TouchableOpacity 
              style={styles.declineButton}
              onPress={() => handleAction(message.id, 'decline', message.name)}
            >
              <Text style={styles.declineButtonText}>🗑 Non</Text>
            </TouchableOpacity>
          )}
        </View>
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
        <Text style={styles.headerTitle}>Boîte de réception</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'messages' && styles.activeTab
          ]}
          onPress={() => setActiveTab('messages')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'messages' && styles.activeTabText
          ]}>
            💬 Messages & Likes ({getMessagesCount()})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'invitations' && styles.activeTab
          ]}
          onPress={() => setActiveTab('invitations')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'invitations' && styles.activeTabText
          ]}>
            📩 Invitations ({getInvitationsCount().toString().padStart(2, '0')})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <ScrollView style={styles.messagesList} showsVerticalScrollIndicator={false}>
        {activeTab === 'messages' && messages.map(renderMessage)}
        
        {activeTab === 'invitations' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Aucune invitation pour le moment</Text>
          </View>
        )}
      </ScrollView>

      {/* Process All Button */}
      {activeTab === 'messages' && messages.length > 0 && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity 
            style={styles.processAllButton}
            onPress={handleProcessAllMessages}
          >
            <Text style={styles.processAllButtonText}>🗑 Invitat. d'Étodie supprimée</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toast Message */}
      {toastMessage && (
        <View style={[
          styles.toast,
          toastType === 'success' ? styles.toastSuccess : styles.toastError
        ]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      <BottomNavigation activeTab="messages" />
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
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: Spacing.sm,
  },
  backArrow: {
    fontSize: 24,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  settingsButton: {
    padding: Spacing.sm,
  },
  settingsIcon: {
    fontSize: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.secondary,
  },
  tabText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.secondary,
    fontWeight: '600',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  messageCard: {
    flexDirection: 'row',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  userName: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  timeAgo: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
  },
  messageText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  processAllHint: {
    backgroundColor: '#F0F0F0',
    padding: Spacing.sm,
    borderRadius: 8,
    marginBottom: Spacing.md,
  },
  processAllText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  acceptButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  acceptButtonText: {
    color: Colors.secondary,
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  laterButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  laterButtonText: {
    color: Colors.text.secondary,
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  declineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  declineButtonText: {
    color: Colors.text.secondary,
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  bottomButtonContainer: {
    padding: Spacing.lg,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  processAllButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  processAllButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl * 2,
  },
  emptyStateText: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
  },
  toast: {
    position: 'absolute',
    bottom: 100,
    left: Spacing.lg,
    right: Spacing.lg,
    borderRadius: 25,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  toastSuccess: {
    backgroundColor: Colors.secondary,
  },
  toastError: {
    backgroundColor: '#FF5CA0',
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
});