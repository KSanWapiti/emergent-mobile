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
import { Colors, FontSizes, Spacing } from '../constants/Colors';

interface Notification {
  id: string;
  type: 'like' | 'message' | 'activity' | 'match';
  userName: string;
  userAvatar: string;
  content: string;
  timeAgo: string;
  isRead: boolean;
  activityTitle?: string;
  activityDate?: string;
  activityTime?: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      userName: 'Élodie',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616c96e1d0b?w=100&h=100&fit=crop&crop=face',
      content: 'vous a liké',
      timeAgo: '5 min',
      isRead: false,
    },
    {
      id: '2',
      type: 'message',
      userName: 'Camille',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      content: 'vous a envoyé un message',
      timeAgo: '10 min',
      isRead: false,
    },
    {
      id: '3',
      type: 'activity',
      userName: 'Clémence',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: 'vous invite à',
      timeAgo: '1h',
      isRead: false,
      activityTitle: 'Running Afternoon',
      activityDate: '22 février',
      activityTime: '16h00 - 18h00',
    },
    {
      id: '4',
      type: 'like',
      userName: 'Inès',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'vous a liké',
      timeAgo: '2h',
      isRead: true,
    },
    {
      id: '5',
      type: 'match',
      userName: 'Manon',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'vous avez matché',
      timeAgo: '3h',
      isRead: true,
    },
    {
      id: '6',
      type: 'message',
      userName: 'Anaïs',
      userAvatar: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=100&h=100&fit=crop&crop=face',
      content: 'vous a envoyé un message',
      timeAgo: '5h',
      isRead: true,
    },
    {
      id: '7',
      type: 'activity',
      userName: 'Maëlys',
      userAvatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face',
      content: 'vous invite à',
      timeAgo: '1 jour',
      isRead: true,
      activityTitle: 'Cours de Yoga en plein air',
      activityDate: '25 février',
      activityTime: '10h00 - 11h30',
    },
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId 
        ? { ...notif, isRead: true }
        : notif
    ));
  };

  const handleNotificationPress = (notification: Notification) => {
    markAsRead(notification.id);
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'message':
        router.push('/messages');
        break;
      case 'like':
        router.push('/profiles');
        break;
      case 'activity':
        router.push('/messages'); // Navigate to invitations tab
        break;
      case 'match':
        router.push('/profiles');
        break;
      default:
        break;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return '💖';
      case 'message':
        return '💬';
      case 'activity':
        return '📅';
      case 'match':
        return '⚡';
      default:
        return '🔔';
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.isRead).length;
  };

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity 
      key={notification.id} 
      style={[
        styles.notificationCard,
        !notification.isRead && styles.unreadNotification
      ]}
      onPress={() => handleNotificationPress(notification)}
    >
      <View style={styles.notificationContent}>
        <Image source={{ uri: notification.userAvatar }} style={styles.avatar} />
        
        <View style={styles.textContent}>
          <View style={styles.mainContent}>
            <Text style={styles.notificationText}>
              <Text style={styles.userName}>{notification.userName}</Text>
              <Text style={styles.action}> {notification.content}</Text>
              {notification.activityTitle && (
                <Text style={styles.activityTitle}> {notification.activityTitle}</Text>
              )}
            </Text>
            
            {notification.activityDate && notification.activityTime && (
              <View style={styles.activityDetails}>
                <Text style={styles.activityDate}>📅 {notification.activityDate}</Text>
                <Text style={styles.activityTime}>🕐 {notification.activityTime}</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.timeAgo}>{notification.timeAgo}</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <Text style={styles.notificationTypeIcon}>
            {getNotificationIcon(notification.type)}
          </Text>
          {!notification.isRead && (
            <View style={styles.unreadDot} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader notificationsCount={getUnreadCount()} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>
            {getUnreadCount()} nouvelle{getUnreadCount() !== 1 ? 's' : ''} notification{getUnreadCount() !== 1 ? 's' : ''}
          </Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {notifications.map(renderNotification)}
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
    paddingVertical: Spacing.md,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: '#F8F4FF',
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  notificationContent: {
    flexDirection: 'row',
    padding: Spacing.md,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Spacing.md,
  },
  textContent: {
    flex: 1,
    marginRight: Spacing.md,
  },
  mainContent: {
    marginBottom: Spacing.xs,
  },
  notificationText: {
    fontSize: FontSizes.md,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  userName: {
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  action: {
    color: Colors.text.primary,
  },
  activityTitle: {
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  activityDetails: {
    marginTop: Spacing.xs,
  },
  activityDate: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  timeAgo: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  iconContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  notificationTypeIcon: {
    fontSize: 24,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5CA0',
    position: 'absolute',
    top: -2,
    right: -2,
  },
});