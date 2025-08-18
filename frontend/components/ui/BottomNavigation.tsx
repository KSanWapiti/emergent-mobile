import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

interface BottomNavigationProps {
  activeTab?: 'messages' | 'profiles' | 'activities' | 'profile';
  unreadMessagesCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab = 'profiles',
  unreadMessagesCount = 0
}) => {
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity 
        style={[
          styles.navItem,
          activeTab === 'messages' && styles.navItemActive
        ]} 
        onPress={() => handleNavigation('/messages')}
      >
        <View style={styles.iconContainer}>
          <Text style={[
            styles.navIcon,
            activeTab === 'messages' && styles.navIconActive
          ]}>💬</Text>
          {unreadMessagesCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadMessagesCount > 99 ? '99+' : unreadMessagesCount.toString()}
              </Text>
            </View>
          )}
        </View>
        <Text style={[
          styles.navLabel,
          activeTab === 'messages' && styles.navLabelActive
        ]}>Messages</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.navItem,
          activeTab === 'profiles' && styles.navItemActive
        ]} 
        onPress={() => handleNavigation('/profiles')}
      >
        <Text style={[
          styles.navIcon,
          activeTab === 'profiles' && styles.navIconActive
        ]}>🔍</Text>
        <Text style={[
          styles.navLabel,
          activeTab === 'profiles' && styles.navLabelActive
        ]}>Profils</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.navItem,
          activeTab === 'activities' && styles.navItemActive
        ]} 
        onPress={() => handleNavigation('/activities')}
      >
        <Text style={[
          styles.navIcon,
          activeTab === 'activities' && styles.navIconActive
        ]}>👥</Text>
        <Text style={[
          styles.navLabel,
          activeTab === 'activities' && styles.navLabelActive
        ]}>Activités</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.navItem,
          activeTab === 'profile' && styles.navItemActive
        ]} 
        onPress={() => handleNavigation('/profile')}
      >
        <Text style={[
          styles.navIcon,
          activeTab === 'profile' && styles.navIconActive
        ]}>👤</Text>
        <Text style={[
          styles.navLabel,
          activeTab === 'profile' && styles.navLabelActive
        ]}>Mon Profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  navItemActive: {
    backgroundColor: Colors.secondary + '10',
    borderRadius: 10,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  navIconActive: {
    color: Colors.secondary,
  },
  navLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  navLabelActive: {
    color: Colors.secondary,
    fontWeight: '600',
  },
});