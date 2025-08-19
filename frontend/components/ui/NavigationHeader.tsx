import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { DrawerMenu } from './DrawerMenu';
import { Colors, Spacing, FontSizes } from '../../constants/Colors';

interface NavigationHeaderProps {
  onMenuPress?: () => void;
  showMenu?: boolean;
  notificationsCount?: number;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onMenuPress,
  showMenu = true,
  notificationsCount = 5,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      setIsMenuVisible(true);
    }
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  const handleNotificationsPress = () => {
    router.push('/notifications');
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          {showMenu && (
            <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
              <View style={styles.menuIcon}>
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
              </View>
            </TouchableOpacity>
          )}
          
          <View style={styles.logoContainer}>
            <View style={styles.heartLogo}>
              <View style={[styles.heartLeft, styles.heartPart]} />
              <View style={[styles.heartRight, styles.heartPart]} />
              <View style={styles.heartBottom} />
            </View>
            <Text style={styles.logoText}>tyte</Text>
          </View>
          
          <View style={styles.rightSpace} />
        </View>
      </SafeAreaView>

      <DrawerMenu 
        visible={isMenuVisible}
        onClose={handleCloseMenu}
      />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuButton: {
    padding: Spacing.sm,
  },
  menuIcon: {
    width: 24,
    height: 20,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 3,
    backgroundColor: Colors.text.primary,
    borderRadius: 1.5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  heartLogo: {
    width: 32,
    height: 32,
    position: 'relative',
    marginRight: Spacing.sm,
  },
  heartPart: {
    width: 14,
    height: 12,
    position: 'absolute',
    borderRadius: 7,
    top: 2,
  },
  heartLeft: {
    left: 4,
    backgroundColor: '#60a5fa', // Light blue
    transform: [{ rotate: '-45deg' }],
  },
  heartRight: {
    right: 4,
    backgroundColor: '#f472b6', // Pink
    transform: [{ rotate: '45deg' }],
  },
  heartBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#a855f7', // Purple
    position: 'absolute',
    bottom: 6,
    left: 6,
  },
  logoText: {
    fontSize: FontSizes.lg + 2,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  rightSpace: {
    width: 40, // Same as menu button to center logo
  },
});