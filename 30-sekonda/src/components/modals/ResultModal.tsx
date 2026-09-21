import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { GameModalProps, TeamColor } from '../../types';
import { colors, fontSize, borderRadius, spacing } from '../../styles/theme';

const getTeamName = (team: TeamColor) =>
  team.charAt(0).toUpperCase() + team.slice(1);

/**
 * Shown at the end of each turn. Tells the group how the turn went,
 * whether a point was scored, the running score, and who is up next.
 */
export const ResultModal: React.FC<GameModalProps> = ({
  visible,
  isSuccess,
  playerName,
  team,
  guessedCount,
  totalWords,
  teamScores,
  activeTeams,
  nextPlayerName,
  nextPlayerTeam,
  onNext,
}) => {
  const teamColor = colors.team[team];
  const accent = isSuccess ? colors.feedback.success : colors.feedback.danger;

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { borderColor: accent }]}>
          <Text style={styles.modalTitle}>
            {isSuccess ? '🎉 All words guessed!' : "⏱️ Time's up!"}
          </Text>

          <Text style={styles.playerLine}>
            <Text style={{ color: teamColor, fontWeight: 'bold' }}>{playerName}</Text>
            {' '}got{' '}
            <Text style={styles.bold}>
              {guessedCount} / {totalWords}
            </Text>
            {' '}words
          </Text>

          <View style={[styles.pointBadge, { backgroundColor: isSuccess ? teamColor : colors.background.tertiary }]}>
            <Text style={styles.pointBadgeText}>
              {isSuccess
                ? `+1 point for ${getTeamName(team)} Team`
                : 'No point this turn'}
            </Text>
          </View>

          <Text style={styles.scoreLabel}>Score</Text>
          <View style={styles.scoreRow}>
            {activeTeams.map((t) => (
              <Text key={t} style={[styles.scoreText, { color: colors.team[t] }]}>
                {getTeamName(t)} {teamScores[t]}
              </Text>
            ))}
          </View>

          {nextPlayerName && nextPlayerTeam && (
            <Text style={styles.nextUp}>
              Next up:{' '}
              <Text style={{ color: colors.team[nextPlayerTeam], fontWeight: 'bold' }}>
                {nextPlayerName}
              </Text>
              {' '}({getTeamName(nextPlayerTeam)} Team)
            </Text>
          )}

          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>
              {nextPlayerName ? `Pass to ${nextPlayerName}` : 'See results'}
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
  },
  modalTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    textAlign: 'center',
    color: colors.text.primary,
  },
  playerLine: {
    textAlign: 'center',
    color: colors.text.primary,
    marginBottom: spacing.md,
    fontSize: fontSize.lg,
  },
  bold: {
    fontWeight: 'bold',
  },
  pointBadge: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    marginBottom: spacing.lg,
  },
  pointBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSize.md,
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
    marginBottom: spacing.lg,
  },
  scoreText: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
  },
  nextUp: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: colors.team.blue,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    width: '100%',
  },
  nextButtonText: {
    color: 'white',
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
