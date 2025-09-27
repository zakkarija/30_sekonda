import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TeamColor } from '../types';
import { colors } from '../styles/theme';

interface PlayerTurnIndicatorProps {
  playerName: string;
  team: TeamColor;
}

export const PlayerTurnIndicator: React.FC<PlayerTurnIndicatorProps> = ({
  playerName,
  team
}) => {
  const getTeamEmoji = (team: TeamColor) => {
    switch (team) {
      case 'red': return '🔴';
      case 'blue': return '🔵';
      case 'green': return '🟢';
      case 'yellow': return '🟡';
      default: return '⚪';
    }
  };

  const getTeamName = (team: TeamColor) => {
    return team.charAt(0).toUpperCase() + team.slice(1);
  };

  return (
    <View style={[
      styles.playerTurnContainer,
      { backgroundColor: colors.team[team] }
    ]}>
      <Text style={styles.playerTurnLabel} numberOfLines={1} ellipsizeMode="tail">
        {playerName}&apos;s Turn
      </Text>
      <Text style={styles.teamIndicator}>
        {getTeamEmoji(team)} {getTeamName(team)} Team
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