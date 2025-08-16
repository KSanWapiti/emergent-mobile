import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const handleMenuItemPress = (route: string) => {
    onClose();
    // TODO: Navigate to the appropriate route
    console.log(`Navigate to: ${route}`);
  };

  const menuItems = [
    {
      section: 'Main Menu',
      items: [
        {
          id: 'profile',
          title: 'Mon Profil',
          icon: '👤',
          iconColor: Colors.secondary,
          route: '/profile',
        },
        {
          id: 'profiles',
          title: 'Profils',
          icon: '🔍',
          iconColor: Colors.text.primary,
          route: '/profiles',
        },
        {
          id: 'messages',
          title: 'Messages',
          icon: '💬',
          iconColor: Colors.text.primary,
          route: '/messages',
        },
        {
          id: 'activities',
          title: 'Activités',
          icon: '👥',
          iconColor: Colors.text.primary,
          route: '/activities',
        },
      ]
    },
    {
      section: 'Others',
      items: [
        {
          id: 'info',
          title: 'Info',
          route: '/info',
        },
        {
          id: 'share',
          title: 'Partage',
          route: '/share',
        },
        {
          id: 'faq',
          title: 'FAQ',
          route: '/faq',
        },
        {
          id: 'support',
          title: 'Support',
          route: '/support',
        },
        {
          id: 'privacy',
          title: 'Privacy Policy',
          route: '/privacy',
        },
      ]
    }
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={onClose}
          activeOpacity={1}
        />
        
        <View style={styles.drawerContainer}>
          {/* Header */}
          <View style={styles.drawerHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <View style={styles.heartLogo}>
                <View style={[styles.heartLeft, styles.heartPart]} />
                <View style={[styles.heartRight, styles.heartPart]} />
                <View style={styles.heartBottom} />
              </View>
              <Text style={styles.logoText}>tyte</Text>
            </View>
          </View>

          {/* Menu Content */}
          <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
            {menuItems.map((section) => (
              <View key={section.section} style={styles.menuSection}>
                <Text style={styles.sectionTitle}>{section.section}</Text>
                <View style={styles.sectionDivider} />
                
                {section.items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      item.id === 'profile' && styles.activeMenuItem
                    ]}
                    onPress={() => handleMenuItemPress(item.route)}
                  >
                    {item.icon && (
                      <Text style={[
                        styles.menuIcon,
                        { color: item.iconColor || Colors.text.primary }
                      ]}>
                        {item.icon}
                      </Text>
                    )}
                    <Text style={[
                      styles.menuText,
                      item.id === 'profile' && styles.activeMenuText
                    ]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.drawerFooter}>
            <Text style={styles.versionText}>App version 1.0.03</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    width: screenWidth * 0.8,
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: 50,
  },
  drawerHeader: {
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.xl,
    padding: Spacing.sm,
  },
  closeIcon: {
    fontSize: 20,
    color: Colors.text.secondary,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  heartLogo: {
    width: 40,
    height: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  heartPart: {
    width: 18,
    height: 14,
    position: 'absolute',
    borderRadius: 10,
    top: 0,
  },
  heartLeft: {
    left: 4,
    backgroundColor: '#60a5fa',
    transform: [{ rotate: '-45deg' }],
  },
  heartRight: {
    right: 4,
    backgroundColor: '#f472b6',
    transform: [{ rotate: '45deg' }],
  },
  heartBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#a855f7',
    position: 'absolute',
    bottom: -2,
  },
  logoText: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: '#1e3a8a',
    letterSpacing: 1,
  },
  menuContent: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  menuSection: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.secondary,
    marginBottom: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.xs,
    borderRadius: 8,
  },
  activeMenuItem: {
    backgroundColor: Colors.secondary + '10',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: Spacing.md,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  activeMenuText: {
    color: Colors.secondary,
    fontWeight: '600',
  },
  drawerFooter: {
    padding: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'center',
  },
  versionText: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    opacity: 0.6,
  },
});