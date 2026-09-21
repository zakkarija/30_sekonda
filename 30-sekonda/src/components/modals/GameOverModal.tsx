import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { GameOverModalProps, TeamColor } from '../../types';
import { colors, fontSize, borderRadius, spacing } from '../../styles/theme';

export const GameOverModal: React.FC<GameOverModalProps> = ({
  visible,
  winningTeam,
  teamScores,
  activeTeams,
  onReturn
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

  const title = winningTeam
    ? `${getTeamEmoji(winningTeam)} ${getTeamName(winningTeam)} Team Wins! ${getTeamEmoji(winningTeam)}`
    : "🤝 It's a draw!";

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, winningTeam ? { borderColor: colors.team[winningTeam] } : null]}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.scoreLabel}>Final score</Text>
          <View style={styles.scoreRow}>
            {activeTeams.map((team) => (
              <Text key={team} style={[styles.scoreText, { color: colors.team[team] }]}>
                {getTeamName(team)} {teamScores[team]}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={onReturn}
          >
            <Text style={styles.buttonText}>
              Play Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    borderWidth: 2,
    borderColor: colors.feedback.info,
  },
  modalTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.text.primary,
  },
  scoreLabel: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  scoreText: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: colors.feedback.success,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
