import React from 'react';
import { Text, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { Colors } from '../../constants/Colors';

interface GradientTextProps {
  children: React.ReactNode;
  style?: any;
}

export const GradientText: React.FC<GradientTextProps> = ({ children, style }) => {
  // Pour le web, on utilise un style CSS gradient
  // Pour mobile, on utiliserait MaskedView avec LinearGradient
  
  return (
    <Text 
      style={[
        style,
        {
          // Fallback pour web - approximation du gradient avec la couleur principale
          color: Colors.primary.start,
          // Pour web, on peut utiliser une approche différente si nécessaire
        }
      ]}
    >
      {children}
    </Text>
  );
};