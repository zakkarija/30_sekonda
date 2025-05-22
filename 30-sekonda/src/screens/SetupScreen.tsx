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
  UIManager
} from 'react-native';
import { router } from 'expo-router';
import { Player } from '../types';
import { MIN_PLAYERS, MAX_PLAYERS, ROUND_OPTIONS } from '../constants/game';

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
      setNumPlayers(prev => prev + 1);
      setPlayers([...players, { 
        id: players.length + 1, 
        name: '', 
        isRedTeam: players.length % 2 === 0 
      }]);
    }
  };

  const removePlayer = () => {
    if (numPlayers > MIN_PLAYERS) {
      setNumPlayers(prev => prev - 1);
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
    <KeyboardAvoidingView 
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Increased offset
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
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
                  trackColor={{ false: '#4361EE', true: '#FF4D6D' }}
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
            {ROUND_OPTIONS.map((rounds) => (
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
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 24,
    paddingBottom: 100, // Add extra padding to the bottom for scroll space
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#F8F9FA',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#F8F9FA',
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    backgroundColor: '#1E1E34',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  activeLanguageButton: {
    backgroundColor: '#FF4D6D',
  },
  languageButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8F9FA',
  },
  playerCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E34',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  counterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decrementButton: {
    backgroundColor: '#F72585',
  },
  incrementButton: {
    backgroundColor: '#06D6A0',
  },
  counterButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  playerCount: {
    fontSize: 28,
    marginHorizontal: 24,
    color: '#F8F9FA',
  },
  playerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#1E1E34',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    color: '#F8F9FA',
    fontSize: 16, // Ensure a good font size
    height: 50, // Ensure a good height for tap target and visibility
  },
  teamToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E34',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  teamLabel: {
    marginRight: 8,
    color: '#F8F9FA',
  },
  roundsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  roundButton: {
    backgroundColor: '#1E1E34',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  activeRoundButton: {
    backgroundColor: '#4361EE',
  },
  roundButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8F9FA',
  },
  startButton: {
    backgroundColor: '#06D6A0',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 40,
  },
  disabledStartButton: {
    backgroundColor: '#6C757D',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
}); 