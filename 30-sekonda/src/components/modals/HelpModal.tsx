import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { colors, fontSize, borderRadius, spacing } from '../../styles/theme';

interface HelpModalProps {
  visible: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>How to Play 30 Sekonda</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎯 Game Overview</Text>
              <Text style={styles.text}>
                30 Sekonda is a fast-paced team guessing game where players take turns describing words to their teammates within 30 seconds.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👥 Teams</Text>
              <Text style={styles.text}>
                • Players are divided into teams (Red, Blue, Green, Yellow){'\n'}
                • Usually 2 teams with equal numbers of players{'\n'}
                • Tap the colored circle next to each player&apos;s name to change their team
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎮 How to Play</Text>
              <Text style={styles.text}>
                1. One player from the active team describes 5 words{'\n'}
                2. They have 30 seconds to get their team to guess all words{'\n'}
                3. The describer cannot say the actual word or any part of it{'\n'}
                4. Teammates shout out guesses{'\n'}
                5. Tap words when correctly guessed{'\n'}
                6. If all 5 words are guessed, the team scores a point
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🏆 Winning</Text>
              <Text style={styles.text}>
                The first team to win more than half of the total rounds wins the game!
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💡 Tips</Text>
              <Text style={styles.text}>
                • Use gestures and acting to help describe words{'\n'}
                • Think of synonyms, categories, or descriptions{'\n'}
                • Skip difficult words and come back to them{'\n'}
                • Stay calm under pressure - you&apos;ve got this!
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.gotItButton} onPress={onClose}>
            <Text style={styles.gotItButtonText}>Got it!</Text>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: colors.feedback.info,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  modalTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  scrollContainer: {
    maxHeight: '70%',
  },
  section: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.feedback.info,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: fontSize.md,
    color: colors.text.primary,
    lineHeight: 22,
  },
  gotItButton: {
    backgroundColor: colors.feedback.success,
    margin: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  gotItButtonText: {
    color: 'white',
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});