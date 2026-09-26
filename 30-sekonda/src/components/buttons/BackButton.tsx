import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BackButtonProps {
  onPress: () => void;
}

/**
 * Laid out in normal flow (not absolutely positioned) so it can sit in a
 * header row without overlapping whatever is below it.
 */
export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Leave game"
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <Ionicons name="arrow-back" size={26} color="#F8F9FA" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
