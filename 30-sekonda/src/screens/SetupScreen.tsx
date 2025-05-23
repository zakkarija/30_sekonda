import React, { useState, useEffect, useRef } from 'react';
import {
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Switch, 
  KeyboardAvoidingView, 
  Platform,
  findNodeHandle,
  UIManager,
  SafeAreaView
} from 'react-native';
import { router } from 'expo-router';
import { Player } from '../types';
import { MIN_PLAYERS, MAX_PLAYERS, ROUND_OPTIONS } from '../constants/game';
import { colors, fontSize, borderRadius, spacing } from '../styles/theme';

interface PlayerInputRef {
  [key: number]: TextInput | null;
}

export default function SetupScreen() {
  const [language, setLanguage] = useState('English');
  const [numPlayers, setNumPlayers] = useState(MIN_PLAYERS);
  const [numRounds, setNumRounds] = useState(ROUND_OPTIONS[0]);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: '', isRedTeam: true },
    { id: 2, name: '', isRedTeam: false },
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

  const updatePlayer = (id: number, field: keyof Player, value: string | boolean) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, [field]: value } : player
    ));
  };

  const addPlayer = () => {
    if (numPlayers < MAX_PLAYERS) {
      setNumPlayers((prev: number) => prev + 1);
      setPlayers([...players, { 
        id: players.length + 1, 
        name: '', 
        isRedTeam: players.length % 2 === 0 
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.container}
          contentContainerStyle={styles.scrollContentContainer}
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
                <View style={styles.teamToggle}>
                  <Text style={styles.teamLabel}>
                    {player.isRedTeam ? '🔴' : '🔵'}
                  </Text>
                  <Switch
                    value={player.isRedTeam}
                    onValueChange={(value) => updatePlayer(player.id, 'isRedTeam', value)}
                    trackColor={{ false: colors.team.blue, true: colors.team.red }}
                    thumbColor="#f4f3f4"
                    ios_backgroundColor="#3e3e3e"
                  />
                </View>
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
    paddingBottom: 100,
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
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginRight: spacing.md,
    color: colors.text.primary,
    fontSize: fontSize.md,
    height: 50,
  },
  teamToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  teamLabel: {
    marginRight: spacing.sm,
    color: colors.text.primary,
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
    marginBottom: 40,
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