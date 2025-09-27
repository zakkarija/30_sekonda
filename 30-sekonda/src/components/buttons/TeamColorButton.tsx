import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { TeamColor } from '../../types';

interface TeamColorButtonProps {
  team: TeamColor;
  onPress: () => void;
}

export default function TeamColorButton({ team, onPress }: TeamColorButtonProps) {
  const getTeamColor = () => {
    return colors.team[team];
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getTeamColor() }]}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});