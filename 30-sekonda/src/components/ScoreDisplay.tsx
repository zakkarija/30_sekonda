import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TeamColor } from '../types';
import { colors } from '../styles/theme';

interface ScoreDisplayProps {
  teamScores: Record<TeamColor, number>;
  activeTeams: TeamColor[];
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ teamScores, activeTeams }) => {
  const getTeamName = (team: TeamColor) => {
    return team.charAt(0).toUpperCase() + team.slice(1);
  };

  return (
    <View style={styles.scoreContainer}>
      {activeTeams.map((team, index) => (
        <React.Fragment key={team}>
          <Text style={[styles.scoreText, { color: colors.team[team] }]}>
            {getTeamName(team)}: {teamScores[team]}
          </Text>
          {index < activeTeams.length - 1 && (
            <Text style={styles.scoreTextSeparator}>•</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  scoreTextSeparator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8F9FA', // Light color for separator
    marginHorizontal: 4,
  },
}); 