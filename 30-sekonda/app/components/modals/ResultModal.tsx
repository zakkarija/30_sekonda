import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface ResultModalProps {
  visible: boolean;
  isSuccess: boolean;
  onNext: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ 
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
  nextButton: {
    backgroundColor: '#4361EE',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 