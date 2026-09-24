import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { getLanguage } from '../assets/wordlists';
import { colors, spacing, fontSize } from '../styles/theme';
import { DEFAULT_TIMER_SECONDS, WORDS_PER_ROUND, ROUND_OPTIONS } from '../constants/game';

// Import components using barrel import
import {
  GameTimer,
  WordList,
  PlayerTurnIndicator,
  ScoreDisplay,
  RoundInfoDisplay,
  BackButton,
  ResultModal,
  GameOverModal,
  TurnReadyModal
} from '../components';
import { Player, Word, TeamColor } from '../types';

/**
 * A turn moves through three phases:
 *  - ready:   "Pass the phone to X" screen. Timer is NOT running.
 *  - playing: Timer counts down, words can be tapped.
 *  - result:  Turn summary. Timer is stopped.
 */
type TurnPhase = 'ready' | 'playing' | 'result';

const getPlayerTeam = (player: Player): TeamColor =>
  player.team || (player.isRedTeam ? 'red' : 'blue');

/** 0..n-1 in random order (Fisher–Yates). */
const shuffledIndices = (n: number): number[] => {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function GameScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMER_SECONDS);
  const [words, setWords] = useState<Word[]>([]);
  const [turnPhase, setTurnPhase] = useState<TurnPhase>('ready');
  const [isSuccess, setIsSuccess] = useState(false);
  const [teamScores, setTeamScores] = useState<Record<TeamColor, number>>({
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0,
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [turnNumber, setTurnNumber] = useState(0);
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
  const totalRounds = params.rounds ? parseInt(params.rounds as string) : ROUND_OPTIONS[0];
  // Unknown or missing codes fall back to English rather than crashing.
  const language = getLanguage(params.language as string | undefined);

  // Calculate winning score (more than half of total rounds)
  const winningScore = Math.ceil(totalRounds / 2);

  // Get active teams (teams with players)
  const activeTeams = useMemo(() => {
    const teams = new Set<TeamColor>();
    players.forEach(player => teams.add(getPlayerTeam(player)));
    return Array.from(teams);
  }, [players]);


  // A shuffled pile of word indices, dealt from the top like a card deck, so
  // no word repeats within a game. Only reshuffled if the pile runs out.
  const deckRef = useRef<{ code: string; pile: number[] }>({ code: '', pile: [] });

  const getNewWords = useCallback((): Word[] => {
    const wordList = language.words;
    const deck = deckRef.current;
    const numWordsToPick = Math.min(WORDS_PER_ROUND, wordList.length);

    const dealt: Word[] = [];
    while (dealt.length < numWordsToPick) {
      if (deck.code !== language.code || deck.pile.length === 0) {
        deck.code = language.code;
        deck.pile = shuffledIndices(wordList.length);
      }
      const index = deck.pile.pop()!;
      // After a reshuffle, skip anything already on this turn's cards.
      if (dealt.some((w) => w.id === index)) continue;
      dealt.push({ id: index, text: wordList[index], checked: false });
    }
    return dealt;
  }, [language]);

  // Reset for a new turn. Keyed on turnNumber (not player index) so it
  // also fires when the same player is up again, e.g. with one player per team.
  useEffect(() => {
    setWords(getNewWords());
    setTimeLeft(DEFAULT_TIMER_SECONDS);
    setIsSuccess(false);
    setTurnPhase('ready');
  }, [turnNumber, getNewWords]);

  // Timer countdown — only runs while a turn is actively being played
  useEffect(() => {
    if (turnPhase !== 'playing' || gameOver) return;

    if (timeLeft <= 0) {
      setIsSuccess(false);
      setTurnPhase('result');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, turnPhase, gameOver]);

  const startTurn = () => {
    setTurnPhase('playing');
  };

  // Handle word check
  const toggleWord = (id: number) => {
    if (turnPhase !== 'playing') return;

    const newWords = words.map((word) =>
      word.id === id ? { ...word, checked: !word.checked } : word
    );
    setWords(newWords);

    // Check if all words are checked
    if (newWords.every((word) => word.checked)) {
      setIsSuccess(true);
      setTurnPhase('result');
    }
  };

  const guessedCount = words.filter((w) => w.checked).length;

  // Work out what pressing "Next" will do, so the result modal can
  // say who is up next (or that the game is about to end).
  const turnOutcome = useMemo(() => {
    if (!currentPlayer) {
      return { newScores: teamScores, winner: null as TeamColor | null, gameEnds: false, nextIndex: 0, nextRound: currentRound };
    }

    const newScores = { ...teamScores };
    if (isSuccess) {
      const team = getPlayerTeam(currentPlayer);
      newScores[team] = teamScores[team] + 1;
    }

    // Early win: someone reached the winning score
    const earlyWinner = activeTeams.find((team) => newScores[team] >= winningScore) ?? null;

    const nextIndex = (currentPlayerIndex + 1) % players.length;
    const roundComplete = nextIndex === 0;
    const nextRound = roundComplete ? currentRound + 1 : currentRound;
    const outOfRounds = roundComplete && currentRound >= totalRounds;

    let winner: TeamColor | null = earlyWinner;
    if (!winner && outOfRounds) {
      // Highest score wins; equal top scores is a draw
      const top = Math.max(...activeTeams.map((t) => newScores[t]));
      const leaders = activeTeams.filter((t) => newScores[t] === top);
      winner = leaders.length === 1 ? leaders[0] : null;
    }

    return {
      newScores,
      winner,
      gameEnds: Boolean(earlyWinner) || outOfRounds,
      nextIndex,
      nextRound,
    };
  }, [currentPlayer, teamScores, isSuccess, activeTeams, winningScore, currentPlayerIndex, players.length, currentRound, totalRounds]);

  const nextPlayer = turnOutcome.gameEnds ? null : players[turnOutcome.nextIndex];

  // Handle next turn
  const handleNext = () => {
    setTeamScores(turnOutcome.newScores);

    if (turnOutcome.gameEnds) {
      setWinningTeam(turnOutcome.winner);
      setGameOver(true);
      return;
    }

    setCurrentRound(turnOutcome.nextRound);
    setCurrentPlayerIndex(turnOutcome.nextIndex);
    setTurnNumber((n) => n + 1);
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

  const currentTeam = getPlayerTeam(currentPlayer);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        {/* Custom Back Button */}
        <BackButton onPress={() => router.back()} />

        {/* Score Display */}
        <ScoreDisplay teamScores={teamScores} activeTeams={activeTeams} />

        {/* Round Indicator */}
        <RoundInfoDisplay currentRound={currentRound} totalRounds={totalRounds} />

        {/* Top Info Row: Player Turn and Timer */}
        <View style={styles.topInfoRow}>
          {/* Player turn indicator */}
          <PlayerTurnIndicator
            playerName={currentPlayer.name}
            team={currentTeam}
          />

          {/* Timer section */}
          <GameTimer timeLeft={timeLeft} />
        </View>

        {/* Instruction hint */}
        <Text style={styles.hint}>
          Tap a word when your team guesses it · {guessedCount} / {words.length}
        </Text>

        {/* Words container — hidden until the turn starts so nobody can peek */}
        {turnPhase === 'ready' ? (
          <View style={styles.wordsPlaceholder} />
        ) : (
          <WordList words={words} onToggleWord={toggleWord} isRTL={language.isRTL} />
        )}

        {/* Pass-the-phone screen, shown before the timer starts */}
        <TurnReadyModal
          visible={turnPhase === 'ready' && !gameOver}
          playerName={currentPlayer.name}
          team={currentTeam}
          currentRound={currentRound}
          totalRounds={totalRounds}
          teamScores={teamScores}
          activeTeams={activeTeams}
          isFirstTurn={turnNumber === 0}
          onStart={startTurn}
        />

        {/* Results modal */}
        <ResultModal
          visible={turnPhase === 'result' && !gameOver}
          isSuccess={isSuccess}
          playerName={currentPlayer.name}
          team={currentTeam}
          guessedCount={guessedCount}
          totalWords={words.length}
          teamScores={turnOutcome.newScores}
          activeTeams={activeTeams}
          nextPlayerName={nextPlayer ? nextPlayer.name : null}
          nextPlayerTeam={nextPlayer ? getPlayerTeam(nextPlayer) : null}
          onNext={handleNext}
        />

        {/* Game Over modal */}
        <GameOverModal
          visible={gameOver}
          winningTeam={winningTeam}
          teamScores={teamScores}
          activeTeams={activeTeams}
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
    marginBottom: spacing.sm,
    minHeight: 90,
  },
  wordsPlaceholder: {
    flex: 1,
  },
  hint: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
});
