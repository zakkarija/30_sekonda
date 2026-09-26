import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { TurnReadyModalProps, TeamColor } from '../../types';
import { colors, fontSize, borderRadius, spacing } from '../../styles/theme';
import { DEFAULT_TIMER_SECONDS, WORDS_PER_ROUND } from '../../constants/game';

const getTeamName = (team: TeamColor) =>
  team.charAt(0).toUpperCase() + team.slice(1);

/**
 * Shown before every turn. The timer does not start until the player
 * holding the phone taps "Start", so there is a clear hand-over moment.
 */
export const TurnReadyModal: React.FC<TurnReadyModalProps> = ({
  visible,
  playerName,
  team,
  currentRound,
  totalRounds,
  teamScores,
  activeTeams,
  isFirstTurn,
  onStart,
  onRequestClose,
}) => {
  const teamColor = colors.team[team];

  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onRequestClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { borderColor: teamColor }]}>
          <Text style={styles.roundText}>
            Round {currentRound} of {totalRounds}
          </Text>

          <Text style={styles.passLabel}>
            {isFirstTurn ? 'First up' : 'Pass the phone to'}
          </Text>
          <Text style={[styles.playerName, { color: teamColor }]} numberOfLines={2}>
            {playerName}
          </Text>
          <View style={[styles.teamBadge, { backgroundColor: teamColor }]}>
            <Text style={styles.teamBadgeText}>{getTeamName(team)} Team</Text>
          </View>

          <View style={styles.scoreRow}>
            {activeTeams.map((t) => (
              <Text key={t} style={[styles.scoreText, { color: colors.team[t] }]}>
                {getTeamName(t)} {teamScores[t]}
              </Text>
            ))}
          </View>

          <View style={styles.instructions}>
            <Text style={styles.instructionLine}>
              🗣️ Describe {WORDS_PER_ROUND} words to your team. Don&apos;t say the word itself!
            </Text>
            <Text style={styles.instructionLine}>
              ✅ Tap each word as soon as your team guesses it.
            </Text>
            <Text style={styles.instructionLine}>
              ⏱️ Get all {WORDS_PER_ROUND} within {DEFAULT_TIMER_SECONDS} seconds to score a point.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: teamColor }]}
            onPress={onStart}
          >
            <Text style={styles.startButtonText}>
              I&apos;m ready — start {DEFAULT_TIMER_SECONDS}s
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
    backgroundColor: 'rgba(0,0,0,0.95)',
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
  roundText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  passLabel: {
    fontSize: fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  playerName: {
    fontSize: fontSize.display,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  teamBadge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    marginBottom: spacing.lg,
  },
  teamBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSize.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  scoreText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  instructions: {
    width: '100%',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  instructionLine: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  startButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    width: '100%',
  },
  startButtonText: {
    color: 'white',
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
