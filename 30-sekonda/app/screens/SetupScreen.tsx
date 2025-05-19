import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Player } from '../types';
import { PlayerInput } from '../components/inputs/PlayerInput';
import { PlayerCountButton } from '../components/buttons/PlayerCountButton';
import { NextButton } from '../components/buttons/NextButton';
import { MIN_PLAYERS, MAX_PLAYERS, ROUND_OPTIONS } from '../constants/game';

export default function SetupScreen() {
  const [language, setLanguage] = useState('English');
  const [numPlayers, setNumPlayers] = useState(MIN_PLAYERS);
  const [numRounds, setNumRounds] = useState(ROUND_OPTIONS[0]);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: '', isRedTeam: true },
    { id: 2, name: '', isRedTeam: false },
  ]);

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

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-3xl font-bold text-center mb-8 text-blue-500">
        Game Setup
      </Text>

      {/* Language Selection */}
      <View className="mb-8">
        <Text className="text-xl font-bold mb-4">Language</Text>
        <View className="flex-row justify-around">
          {['English', 'Maltese'].map((lang) => (
            <TouchableOpacity
              key={lang}
              className={`px-6 py-4 rounded-lg ${
                language === lang ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              onPress={() => setLanguage(lang)}
            >
              <Text className={`text-lg font-bold ${
                language === lang ? 'text-white' : 'text-gray-700'
              }`}>
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Number of Players */}
      <View className="mb-8">
        <Text className="text-xl font-bold mb-4">Number of Players</Text>
        <View className="flex-row items-center justify-center">
          <PlayerCountButton type="decrement" onPress={removePlayer} />
          <Text className="text-2xl mx-6">{numPlayers}</Text>
          <PlayerCountButton type="increment" onPress={addPlayer} />
        </View>
      </View>

      {/* Player Names and Teams */}
      <View className="mb-8">
        <Text className="text-xl font-bold mb-4">Players</Text>
        {players.map((player) => (
          <PlayerInput
            key={player.id}
            player={player}
            onUpdate={updatePlayer}
          />
        ))}
      </View>

      {/* Number of Rounds */}
      <View className="mb-8">
        <Text className="text-xl font-bold mb-4">Number of Rounds</Text>
        <View className="flex-row justify-around">
          {ROUND_OPTIONS.map((rounds) => (
            <TouchableOpacity
              key={rounds}
              className={`px-4 py-3 rounded-lg ${
                numRounds === rounds ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              onPress={() => setNumRounds(rounds)}
            >
              <Text className={`text-lg font-bold ${
                numRounds === rounds ? 'text-white' : 'text-gray-700'
              }`}>
                Best of {rounds}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <NextButton 
        text="Start Game"
        onPress={() => router.push('/game')}
        className="bg-green-500 mb-10"
      />
    </ScrollView>
  );
} 