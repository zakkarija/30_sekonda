import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { Player, Word, TeamColor } from '../types';

export default function GameScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const [timeLeft, setTimeLeft] = useState(30);
  const [words, setWords] = useState<Word[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [teamScores, setTeamScores] = useState<Record<TeamColor, number>>({
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0,
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winningTeam, setWinningTeam] = useState<TeamColor | null>(null);
  
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
        { id: 1, name: 'Player 1', isRedTeam: true, team: 'red' },
        { id: 2, name: 'Player 2', isRedTeam: false, team: 'blue' },
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

  // Get active teams (teams with players)
  const activeTeams = useCallback(() => {
    const teams = new Set<TeamColor>();
    players.forEach(player => {
      if (player.team) teams.add(player.team);
    });
    return Array.from(teams);
  }, [players]);


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
      const playerTeam = currentPlayer.team || (currentPlayer.isRedTeam ? 'red' : 'blue');
      const newScores = { ...teamScores };
      newScores[playerTeam] = teamScores[playerTeam] + 1;
      setTeamScores(newScores);

      // Check if a team has won after updating scores
      const teams = activeTeams();
      for (const team of teams) {
        if (newScores[team] >= winningScore) {
          setWinningTeam(team);
          setGameOver(true);
          setShowModal(false); // Hide the round result modal
          return; // Don't proceed to next player
        }
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
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.errorText}>Loading players...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        {/* Custom Back Button */}
        <BackButton onPress={() => router.back()} />

        {/* Score Display */}
        <ScoreDisplay teamScores={teamScores} activeTeams={activeTeams()} />
        
        {/* Round Indicator */}
        <RoundInfoDisplay currentRound={currentRound} totalRounds={totalRounds} />

        {/* Top Info Row: Player Turn and Timer */}
        <View style={styles.topInfoRow}>
          {/* Player turn indicator */}
          <PlayerTurnIndicator
            playerName={currentPlayer.name}
            team={currentPlayer.team || (currentPlayer.isRedTeam ? 'red' : 'blue')}
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
          teamScores={teamScores}
          activeTeams={activeTeams()}
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