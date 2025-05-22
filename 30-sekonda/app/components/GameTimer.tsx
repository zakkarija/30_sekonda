import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GameTimerProps {
  timeLeft: number;
}

export const GameTimer: React.FC<GameTimerProps> = ({ timeLeft }) => {
  // Timer color based on time left
  const getTimerColor = () => {
    if (timeLeft > 20) return '#06D6A0'; // Success green
    if (timeLeft > 10) return '#FFD166'; // Warning yellow
    return '#EF476F'; // Danger red
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
    backgroundColor: '#2C2C54', 
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginLeft: 5,
  },
  timer: {
    fontSize: 36, 
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: 14,
    color: '#E0E0E0',
  },
}); 