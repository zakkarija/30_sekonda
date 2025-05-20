import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

interface Word {
  id: number;
  text: string;
  checked: boolean;
}

interface Player {
  id: number;
  name: string;
  isRedTeam: boolean;
}

export default function GameScreen() {
  const params = useLocalSearchParams();
  
  const [timeLeft, setTimeLeft] = useState(30);
  const [words, setWords] = useState<Word[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redTeamScore, setRedTeamScore] = useState(0);
  const [blueTeamScore, setBlueTeamScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  
  // Get players from params
  const [players, setPlayers] = useState<Player[]>(() => {
    try {
      return params.players ? JSON.parse(params.players as string) : [];
    } catch (error) {
      console.error('Failed to parse players data:', error);
      return [];
    }
  });
  
  // Use default players if none were passed or parsing failed
  useEffect(() => {
    if (players.length === 0) {
      setPlayers([
        { id: 1, name: 'Player 1', isRedTeam: true },
        { id: 2, name: 'Player 2', isRedTeam: false },
      ]);
    }
  }, [players.length]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = players[currentPlayerIndex];
  
  // Parse the number of rounds (if passed)
  const totalRounds = params.rounds ? parseInt(params.rounds as string) : 3;

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
  }, [currentPlayerIndex]);

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
    if (isSuccess) {
      if (currentPlayer.isRedTeam) {
        setRedTeamScore(prev => prev + 1);
      } else {
        setBlueTeamScore(prev => prev + 1);
      }
    }
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (nextPlayerIndex === 0) { // A full round of players has completed
      setCurrentRound(prevRound => prevRound + 1);
    }
    setCurrentPlayerIndex(nextPlayerIndex);
    setShowModal(false);
  };

  // Timer color based on time left
  const getTimerColor = () => {
    if (timeLeft > 20) return '#06D6A0'; // Success green
    if (timeLeft > 10) return '#FFD166'; // Warning yellow
    return '#EF476F'; // Danger red
  };

  if (!currentPlayer) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Loading players...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Custom Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#F8F9FA" />
        </TouchableOpacity>



        {/* Score Display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTextRed}>Red: {redTeamScore}</Text>
          <Text style={styles.scoreTextSeparator}>-</Text>
          <Text style={styles.scoreTextBlue}>Blue: {blueTeamScore}</Text>
        </View> 
        
        {/* Round Indicator */}
        <View style={styles.roundInfoContainer}>
          <Text style={styles.roundInfoText}>
            Round {currentRound}/{totalRounds}
          </Text>
        </View>



        {/* Top Info Row: Player Turn and Timer */}
        <View style={styles.topInfoRow}>
          {/* Player turn indicator */}
          <View style={[
            styles.playerTurnContainer, 
            { backgroundColor: currentPlayer.isRedTeam ? '#FF4D6D' : '#4361EE' }
          ]}>
            <Text style={styles.playerTurnLabel} numberOfLines={1} ellipsizeMode="tail">
              {currentPlayer.name}'s Turn
            </Text>
            <Text style={styles.teamIndicator}>
              {currentPlayer.isRedTeam ? '🔴 Red Team' : '🔵 Blue Team'}
            </Text>
          </View>
          
          {/* Timer section */}
          <View style={styles.timerContainer}>
            <Text style={[styles.timer, {color: getTimerColor()}]}>
              {timeLeft}
            </Text>
            <Text style={styles.timerLabel}>seconds</Text>
          </View>
        </View>

        {/* Words container */}
        <View style={styles.wordsContainer}>
          {words.map((word) => (
            <TouchableOpacity
              key={word.id}
              style={[
                styles.wordCard, 
                word.checked ? styles.wordCardChecked : null
              ]}
              onPress={() => toggleWord(word.id)}
            >
              <Text style={[
                styles.wordText,
                word.checked ? styles.wordTextChecked : null
              ]}>
                {word.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Results modal */}
        <Modal
          transparent={true}
          visible={showModal}
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
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>
                  Next Round
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  container: {
    flex: 1,
    // backgroundColor: '#1A1A2E', // Already on SafeAreaView
    padding: 24,
    paddingTop: 50, // Adjusted padding for top left button
  },
  backButton: {
    position: 'absolute',
    top: 50, // Adjusted for SafeArea and status bar
    left: 20, // Changed from right to left
    zIndex: 10, // Ensure it's above other content
    padding: 8, // Make it easier to tap
  },
  errorText: {
    color: '#F8F9FA',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    // marginTop: 30, // Add some margin if back button overlaps score
  },
  scoreTextRed: {
    fontSize: 20, // Slightly smaller for balance
    fontWeight: 'bold',
    color: '#FF4D6D', // Red team color
  },
  scoreTextBlue: {
    fontSize: 20, // Slightly smaller for balance
    fontWeight: 'bold',
    color: '#4361EE', // Blue team color
  },
  scoreTextSeparator: {
    fontSize: 20, // Slightly smaller for balance
    fontWeight: 'bold',
    color: '#F8F9FA', // Light color for separator
    marginHorizontal: 10,
  },
  topInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch', // Make children take full height
    width: '100%',
    marginBottom: 15, // Space before word cards
    minHeight: 90, // Ensure a minimum height for this row
  },
  playerTurnContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12, // Adjusted padding
    paddingHorizontal: 8, 
    marginRight: 5, 
  },
  playerTurnLabel: {
    fontSize: 16, // Slightly smaller font for player name
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  teamIndicator: {
    fontSize: 12, // Adjusted for smaller space
    color: 'white',
    opacity: 0.9,
    marginTop: 2,
    textAlign: 'center',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C54', 
    borderRadius: 10,
    paddingVertical: 12, // Adjusted padding
    paddingHorizontal: 8, 
    marginLeft: 5, 
  },
  timer: {
    fontSize: 36, 
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: 14,
    color: '#E0E0E0', 
  },
  roundInfoContainer: { // Styles for the round indicator
    width: '100%',
    paddingVertical: 8,
    marginBottom: 15, // Space before word cards
    alignItems: 'center',
    backgroundColor: '#2C2C54', // Consistent with timer bg
    borderRadius: 8,
  },
  roundInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8F9FA', // White text
  },
  wordsContainer: {
    flex: 1,
    marginVertical: 8,
  },
  wordCard: {
    backgroundColor: '#1E1E34',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  wordCardChecked: {
    backgroundColor: '#06D6A0',
  },
  wordText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F8F9FA',
  },
  wordTextChecked: {
    color: '#1A1A2E',
  },
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