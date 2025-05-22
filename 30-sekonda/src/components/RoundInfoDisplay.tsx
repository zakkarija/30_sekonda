import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RoundInfoDisplayProps {
  currentRound: number;
  totalRounds: number;
}

export const RoundInfoDisplay: React.FC<RoundInfoDisplayProps> = ({ 
  currentRound, 
  totalRounds 
}) => {
  return (
    <View style={styles.roundInfoContainer}>
      <Text style={styles.roundInfoText}>
        Round {currentRound}/{totalRounds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  roundInfoContainer: {
    width: '100%',
    paddingVertical: 8,
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#2C2C54',
    borderRadius: 8,
  },
  roundInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8F9FA',
  },
}); 