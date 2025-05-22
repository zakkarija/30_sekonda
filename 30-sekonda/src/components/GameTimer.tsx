import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, borderRadius, spacing } from '../styles/theme';

interface GameTimerProps {
  timeLeft: number;
}

export const GameTimer: React.FC<GameTimerProps> = ({ timeLeft }) => {
  // Timer color based on time left
  const getTimerColor = () => {
    if (timeLeft > 20) return colors.feedback.success;
    if (timeLeft > 10) return colors.feedback.warning;
    return colors.feedback.danger;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={[styles.timer, {color: getTimerColor()}]}>
        {timeLeft}
      </Text>
      <Text style={styles.timerLabel}>seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.sm,
  },
  timer: {
    fontSize: fontSize.display,
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
}); 