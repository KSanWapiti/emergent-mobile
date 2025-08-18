import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

interface SwitchToggleProps {
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const SwitchToggle: React.FC<SwitchToggleProps> = ({
  title,
  description,
  value,
  onValueChange,
}) => {
  const translateX = useRef(new Animated.Value(value ? 24 : 0)).current;
  const backgroundColor = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: value ? 24 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColor, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const handleToggle = () => {
    onValueChange(!value);
  };

  const backgroundColorInterpolated = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E0E0E0', Colors.secondary],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.switchContainer} onPress={handleToggle}>
          <Animated.View 
            style={[
              styles.switchTrack,
              { backgroundColor: backgroundColorInterpolated }
            ]}
          >
            <Animated.View 
              style={[
                styles.switchThumb,
                { transform: [{ translateX }] }
              ]} 
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text.primary,
    flex: 1,
  },
  switchContainer: {
    marginLeft: Spacing.md,
  },
  switchTrack: {
    width: 52,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  description: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },
});