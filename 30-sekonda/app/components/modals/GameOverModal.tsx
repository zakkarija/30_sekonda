import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface GameOverModalProps {
  visible: boolean;
  winningTeam: 'Red' | 'Blue' | null;
  redScore: number;
  blueScore: number;
  onReturn: () => void;
}

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
    backgroundColor: '#1A1A2E',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    width: '83%',
    borderWidth: 2,
    borderColor: '#4CC9F0',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#F8F9FA',
  },
  modalMessage: {
    textAlign: 'center',
    color: '#F8F9FA',
    marginBottom: 24,
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#06D6A0',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 