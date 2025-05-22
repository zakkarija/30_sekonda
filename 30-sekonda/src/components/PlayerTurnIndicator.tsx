import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlayerTurnIndicatorProps {
  playerName: string;
  isRedTeam: boolean;
}

export const PlayerTurnIndicator: React.FC<PlayerTurnIndicatorProps> = ({ 
  playerName, 
  isRedTeam 
}) => {
  return (
    <View style={[
      styles.playerTurnContainer, 
      { backgroundColor: isRedTeam ? '#FF4D6D' : '#4361EE' }
    ]}>
      <Text style={styles.playerTurnLabel} numberOfLines={1} ellipsizeMode="tail">
        {playerName}'s Turn
      </Text>
      <Text style={styles.teamIndicator}>
        {isRedTeam ? '🔴 Red Team' : '🔵 Blue Team'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerTurnContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8, 
    marginRight: 5, 
  },
  playerTurnLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  teamIndicator: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    marginTop: 2,
    textAlign: 'center',
  },
}); 