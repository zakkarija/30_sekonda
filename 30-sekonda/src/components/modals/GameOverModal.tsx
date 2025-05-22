import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { GameOverModalProps } from '../../types';
import { colors, fontSize, borderRadius, spacing } from '../../styles/theme';

export const GameOverModal: React.FC<GameOverModalProps> = ({ 
  visible, 
  winningTeam, 
  redScore, 
  blueScore, 
  onReturn 
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {winningTeam === 'Red' ? '🔴 Red Team Wins! 🔴' : '🔵 Blue Team Wins! 🔵'}
          </Text>
          <Text style={styles.modalMessage}>
            Final Score: Red {redScore} - Blue {blueScore}
          </Text>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={onReturn}
          >
            <Text style={styles.buttonText}>
              Return to Setup
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    width: '83%',
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
  modalMessage: {
    textAlign: 'center',
    color: colors.text.primary,
    marginBottom: spacing.lg,
    fontSize: fontSize.md,
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