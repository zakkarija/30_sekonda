import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { GameModalProps } from '../../types';
import { colors, fontSize, borderRadius, spacing } from '../../styles/theme';

export const ResultModal: React.FC<GameModalProps> = ({ 
  visible, 
  isSuccess, 
  onNext 
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
            {isSuccess ? '🎉 Success! 🎉' : '⏱️ Time\'s Up! ⏱️'}
          </Text>
          <Text style={styles.modalMessage}>
            {isSuccess 
              ? 'Great job! You got all the words!'
              : 'Better luck next time! Keep practicing!'}
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={onNext}
          >
            <Text style={styles.nextButtonText}>
              Next Round
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