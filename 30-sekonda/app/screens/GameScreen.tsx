import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';

interface Word {
  id: number;
  text: string;
  checked: boolean;
}

export default function GameScreen() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [words, setWords] = useState<Word[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize words (you can replace these with your own words)
  const getNewWords = useCallback(() => {
    // This is a placeholder. You can replace with your own word list or API call
    const wordList = [
      'Apple', 'Banana', 'Orange', 'Grape', 'Mango',
      'Car', 'Bus', 'Train', 'Plane', 'Boat',
      'Dog', 'Cat', 'Bird', 'Fish', 'Mouse'
    ];
    
    const randomWords = [];
    const usedIndices = new Set();
    
    while (randomWords.length < 5) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        randomWords.push({
          id: randomIndex,
          text: wordList[randomIndex],
          checked: false,
        });
      }
    }
    
    return randomWords;
  }, []);

  // Initialize game
  useEffect(() => {
    setWords(getNewWords());
    setTimeLeft(30);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle word check
  const toggleWord = (id: number) => {
    const newWords = words.map((word) =>
      word.id === id ? { ...word, checked: !word.checked } : word
    );
    setWords(newWords);

    // Check if all words are checked
    if (newWords.every((word) => word.checked)) {
      setIsSuccess(true);
      setShowModal(true);
    }
  };

  // Handle next round
  const handleNext = () => {
    setWords(getNewWords());
    setTimeLeft(30);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      
      <View style={styles.wordsContainer}>
        {words.map((word) => (
          <TouchableOpacity
            key={word.id}
            style={[styles.wordItem, word.checked && styles.wordChecked]}
            onPress={() => toggleWord(word.id)}
          >
            <Text style={styles.wordText}>{word.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isSuccess ? 'Success!' : 'Time\'s Up!'}
            </Text>
            <Pressable
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  wordsContainer: {
    flex: 1,
    gap: 10,
  },
  wordItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  wordChecked: {
    backgroundColor: '#4CAF50',
  },
  wordText: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    minWidth: 120,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
}); 