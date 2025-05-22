import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { englishWords } from '../assets/wordlists/english';
import { malteseWords } from '../assets/wordlists/maltese';
import { colors, spacing } from '../styles/theme';

// Import components using barrel import
import {
  GameTimer,
  WordList,
  PlayerTurnIndicator,
  ScoreDisplay,
  RoundInfoDisplay,
  BackButton,
  ResultModal,
  GameOverModal
} from '../components';
import { Player, Word } from '../types';

export default function GameScreen() {
  const params = useLocalSearchParams();
  
  const [timeLeft, setTimeLeft] = useState(30);
  const [words, setWords] = useState<Word[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redTeamScore, setRedTeamScore] = useState(0);
  const [blueTeamScore, setBlueTeamScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winningTeam, setWinningTeam] = useState<'Red' | 'Blue' | null>(null);
  
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
  const selectedLanguage = params.language as string || 'English';

  // Calculate winning score (more than half of total rounds)
  const winningScore = Math.ceil(totalRounds / 2);

  // Check if a team has won
  const checkWinner = useCallback(() => {
    if (redTeamScore >= winningScore) {
      setWinningTeam('Red');
      setGameOver(true);
      return true;
    } else if (blueTeamScore >= winningScore) {
      setWinningTeam('Blue');
      setGameOver(true);
      return true;
    }
    return false;
  }, [redTeamScore, blueTeamScore, winningScore]);

  // Initialize words
  const getNewWords = useCallback(() => {
    // Use the appropriate word list based on selected language
    const wordList = selectedLanguage === 'Maltese' ? malteseWords : englishWords;
    
    const randomWords = [];
    const usedIndices = new Set();
    
    const numWordsToPick = Math.min(5, wordList.length);

    while (randomWords.length < numWordsToPick) {
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
  }, [selectedLanguage]);

  // Initialize game
  useEffect(() => {
    setWords(getNewWords());
    setTimeLeft(30);
  }, [currentPlayerIndex, getNewWords]);

  // Timer countdown
  useEffect(() => {
    if (gameOver) return; // Don't run timer if game is over

    if (timeLeft <= 0) {
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

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
      let newRedScore = redTeamScore;
      let newBlueScore = blueTeamScore;
      
      // Update scores
      if (currentPlayer.isRedTeam) {
        newRedScore = redTeamScore + 1;
        setRedTeamScore(newRedScore);
      } else {
        newBlueScore = blueTeamScore + 1;
        setBlueTeamScore(newBlueScore);
      }
      
      // Check if a team has won after updating scores
      if (newRedScore >= winningScore || newBlueScore >= winningScore) {
        setWinningTeam(newRedScore >= winningScore ? 'Red' : 'Blue');
        setGameOver(true);
        setShowModal(false); // Hide the round result modal
        return; // Don't proceed to next player
      }
    }
    
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (nextPlayerIndex === 0) { // A full round of players has completed
      setCurrentRound(prevRound => prevRound + 1);
    }
    setCurrentPlayerIndex(nextPlayerIndex);
    setShowModal(false);
  };

  // Return to setup screen
  const returnToSetup = () => {
    router.replace('/setup');
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
        <BackButton onPress={() => router.back()} />

        {/* Score Display */}
        <ScoreDisplay redScore={redTeamScore} blueScore={blueTeamScore} />
        
        {/* Round Indicator */}
        <RoundInfoDisplay currentRound={currentRound} totalRounds={totalRounds} />

        {/* Top Info Row: Player Turn and Timer */}
        <View style={styles.topInfoRow}>
          {/* Player turn indicator */}
          <PlayerTurnIndicator 
            playerName={currentPlayer.name}
            isRedTeam={currentPlayer.isRedTeam}
          />
          
          {/* Timer section */}
          <GameTimer timeLeft={timeLeft} />
        </View>

        {/* Words container */}
        <WordList words={words} onToggleWord={toggleWord} />

        {/* Results modal */}
        <ResultModal 
          visible={showModal} 
          isSuccess={isSuccess} 
          onNext={handleNext} 
        />

        {/* Game Over modal */}
        <GameOverModal
          visible={gameOver}
          winningTeam={winningTeam}
          redScore={redTeamScore}
          blueScore={blueTeamScore}
          onReturn={returnToSetup}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
    paddingTop: 50,
  },
  errorText: {
    color: colors.text.primary,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  topInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    marginBottom: spacing.md,
    minHeight: 90,
  },
}); 