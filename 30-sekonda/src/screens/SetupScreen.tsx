import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  findNodeHandle,
  UIManager
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Player, TeamColor } from '../types';
import { MIN_PLAYERS, MAX_PLAYERS, ROUND_OPTIONS } from '../constants/game';
import { colors, fontSize, borderRadius, spacing } from '../styles/theme';
import { TeamColorButton, HelpModal } from '../components';

interface PlayerInputRef {
  [key: number]: TextInput | null;
}

export default function SetupScreen() {
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState('English');
  const [numPlayers, setNumPlayers] = useState(MIN_PLAYERS);
  const [numRounds, setNumRounds] = useState(ROUND_OPTIONS[0]);
  const teams: TeamColor[] = ['red', 'blue', 'green', 'yellow'];
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: '', isRedTeam: true, team: 'red' },
    { id: 2, name: '', isRedTeam: false, team: 'blue' },
  ]);
  const [canStart, setCanStart] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const playerInputRefs = useRef<PlayerInputRef>({});

  // Validate if game can start
  useEffect(() => {
    const validPlayerNames = players.every(p => p.name.trim() !== '');
    const validPlayerCount = players.length >= MIN_PLAYERS;
    setCanStart(validPlayerNames && validPlayerCount);
  }, [players]);

  const updatePlayer = (id: number, field: keyof Player, value: string | boolean | TeamColor) => {
    setPlayers(players.map(player => {
      if (player.id === id) {
        const updatedPlayer = { ...player, [field]: value };
        // Sync isRedTeam with team color for backwards compatibility
        if (field === 'team') {
          updatedPlayer.isRedTeam = value === 'red';
        }
        return updatedPlayer;
      }
      return player;
    }));
  };

  const togglePlayerTeam = (id: number) => {
    const player = players.find(p => p.id === id);
    if (!player) return;

    const currentTeamIndex = teams.indexOf(player.team || 'red');
    const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
    const nextTeam = teams[nextTeamIndex];

    updatePlayer(id, 'team', nextTeam);
  };

  const addPlayer = () => {
    if (numPlayers < MAX_PLAYERS) {
      setNumPlayers((prev: number) => prev + 1);
      // Alternate between red and blue for new players by default
      const newTeam = players.length % 2 === 0 ? 'red' : 'blue';
      setPlayers([...players, {
        id: players.length + 1,
        name: '',
        isRedTeam: newTeam === 'red',
        team: newTeam
      }]);
    }
  };

  const removePlayer = () => {
    if (numPlayers > MIN_PLAYERS) {
      setNumPlayers((prev: number) => prev - 1);
      setPlayers(players.slice(0, -1));
    }
  };

  const startGame = () => {
    if (!canStart) return; // Prevent starting if not valid
    
    router.push({
      pathname: '/game',
      params: {
        players: JSON.stringify(players),
        rounds: numRounds,
        language: language
      }
    });
  };

  const handleInputFocus = (playerId: number) => {
    const textInputNode = playerInputRefs.current[playerId];
    const scrollViewNode = scrollViewRef.current;

    if (textInputNode && scrollViewNode) {
      const reactTextInputNodeHandle = findNodeHandle(textInputNode);
      const reactScrollViewNodeHandle = findNodeHandle(scrollViewNode);

      if (reactTextInputNodeHandle && reactScrollViewNodeHandle) {
        UIManager.measureLayout(
          reactTextInputNodeHandle,
          reactScrollViewNodeHandle,
          () => { /*  onError */ },
          (x, y) => {
            scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
          }
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.container}
          contentContainerStyle={[styles.scrollContentContainer, { paddingTop: insets.top + 10 }]}
          keyboardShouldPersistTaps="handled"
        >
          {/* App Title */}
          <Text style={styles.appTitle}>
            30 Sekonda
          </Text>
          
          {/* Game Setup Title */}
          <Text style={styles.title}>
            Game Setup
          </Text>

          {/* Language Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Language</Text>
            <View style={styles.languageButtons}>
              {['English', 'Maltese'].map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.languageButton,
                    language === lang ? styles.activeLanguageButton : null
                  ]}
                  onPress={() => setLanguage(lang)}
                >
                  <Text style={styles.languageButtonText}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Number of Players */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Number of Players</Text>
            <View style={styles.playerCounter}>
              <TouchableOpacity 
                style={[styles.counterButton, styles.decrementButton]} 
                onPress={removePlayer}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.playerCount}>{numPlayers}</Text>
              <TouchableOpacity 
                style={[styles.counterButton, styles.incrementButton]} 
                onPress={addPlayer}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Player Names and Teams */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Players</Text>

            {/* Column Headers */}
            <View style={styles.columnHeaders}>
              <Text style={styles.columnHeaderText}>Player</Text>
              <View style={styles.teamHeaderContainer}>
                <Text style={styles.columnHeaderText}>Team</Text>
                <TouchableOpacity
                  style={styles.helpButton}
                  onPress={() => setShowHelpModal(true)}
                >
                  <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
              </View>
            </View>

            {players.map((player) => (
              <View key={player.id} style={styles.playerInput}>
                <TextInput
                  ref={(ref: TextInput | null) => {
                    if (ref) {
                      playerInputRefs.current[player.id] = ref;
                    }
                  }}
                  style={styles.input}
                  placeholder={`Player ${player.id}`}
                  placeholderTextColor="#6C757D"
                  value={player.name}
                  onChangeText={(text) => updatePlayer(player.id, 'name', text)}
                  onFocus={() => handleInputFocus(player.id)}
                />
                <TeamColorButton
                  team={player.team || 'red'}
                  onPress={() => togglePlayerTeam(player.id)}
                />
              </View>
            ))}
          </View>

          {/* Number of Rounds */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Number of Rounds</Text>
            <View style={styles.roundsContainer}>
              {ROUND_OPTIONS.map((rounds: number) => (
                <TouchableOpacity
                  key={rounds}
                  style={[
                    styles.roundButton,
                    numRounds === rounds ? styles.activeRoundButton : null
                  ]}
                  onPress={() => setNumRounds(rounds)}
                >
                  <Text style={styles.roundButtonText}>
                    Best of {rounds}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.startButton, !canStart && styles.disabledStartButton]}
            onPress={startGame}
            disabled={!canStart}
          >
            <Text style={styles.startButtonText}>
              Start Game
            </Text>
          </TouchableOpacity>

          {/* Help Modal */}
          <HelpModal
            visible={showHelpModal}
            onClose={() => setShowHelpModal(false)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.md,
    color: colors.feedback.info,
    textShadowColor: 'rgba(76, 201, 240, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.text.primary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  teamHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  helpButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.feedback.info,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    color: 'white',
    fontSize: fontSize.sm,
    fontWeight: 'bold',
  },
  columnHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  columnHeaderText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    backgroundColor: colors.background.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  activeLanguageButton: {
    backgroundColor: colors.team.red,
  },
  languageButtonText: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  playerCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  counterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decrementButton: {
    backgroundColor: colors.feedback.danger,
  },
  incrementButton: {
    backgroundColor: colors.feedback.success,
  },
  counterButtonText: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: 'white',
  },
  playerCount: {
    fontSize: fontSize.xxxl,
    marginHorizontal: spacing.lg,
    color: colors.text.primary,
  },
  playerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginRight: spacing.lg,
    color: colors.text.primary,
    fontSize: fontSize.md,
    height: 50,
  },
  roundsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  roundButton: {
    backgroundColor: colors.background.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  activeRoundButton: {
    backgroundColor: colors.team.blue,
  },
  roundButtonText: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  startButton: {
    backgroundColor: colors.feedback.success,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
  },
  disabledStartButton: {
    backgroundColor: '#6C757D',
  },
  startButtonText: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
}); 