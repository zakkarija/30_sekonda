import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreDisplayProps {
  redScore: number;
  blueScore: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ redScore, blueScore }) => {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreTextRed}>Red: {redScore}</Text>
      <Text style={styles.scoreTextSeparator}>-</Text>
      <Text style={styles.scoreTextBlue}>Blue: {blueScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTextRed: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4D6D', // Red team color
  },
  scoreTextBlue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4361EE', // Blue team color
  },
  scoreTextSeparator: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8F9FA', // Light color for separator
    marginHorizontal: 10,
  },
}); 