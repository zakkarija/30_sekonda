import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { router } from 'expo-router';

interface Player {
  id: number;
  name: string;
  isRedTeam: boolean;
}

export default function SetupScreen() {
  const [language, setLanguage] = useState('English');
  const [numPlayers, setNumPlayers] = useState(2);
  const [numRounds, setNumRounds] = useState(3);
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
    if (numPlayers < 10) {
      setNumPlayers(prev => prev + 1);
      setPlayers([...players, { 
        id: players.length + 1, 
        name: '', 
        isRedTeam: players.length % 2 === 0 
      }]);
    }
  };

  const removePlayer = () => {
    if (numPlayers > 2) {
      setNumPlayers(prev => prev - 1);
      setPlayers(players.slice(0, -1));
    }
  };

  const handleStart = () => {
    router.push('/game');
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
          <TouchableOpacity
            className={`px-6 py-4 rounded-lg ${
              language === 'English' ? 'bg-blue-500' : 'bg-gray-200'
            }`}
            onPress={() => setLanguage('English')}
          >
            <Text className={`text-lg font-bold ${
              language === 'English' ? 'text-white' : 'text-gray-700'
            }`}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-6 py-4 rounded-lg ${
              language === 'Maltese' ? 'bg-blue-500' : 'bg-gray-200'
            }`}
            onPress={() => setLanguage('Maltese')}
          >
            <Text className={`text-lg font-bold ${
              language === 'Maltese' ? 'text-white' : 'text-gray-700'
            }`}>
              Maltese
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Number of Players */}
      <View className="mb-8">
        <Text className="text-xl font-bold mb-4">Number of Players</Text>
        <View className="flex-row items-center justify-center">
          <TouchableOpacity 
            onPress={removePlayer}
            className="bg-blue-500 w-10 h-10 rounded-full justify-center items-center"
          >
            <Text className="text-white text-2xl font-bold">-</Text>
          </TouchableOpacity>
          <Text className="text-2xl mx-6">{numPlayers}</Text>
          <TouchableOpacity 
            onPress={addPlayer}
            className="bg-blue-500 w-10 h-10 rounded-full justify-center items-center"
          >
            <Text className="text-white text-2xl font-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Player Names and Teams */}
      <View className="mb-8">
        <Text className="text-xl font-bold mb-4">Players</Text>
        {players.map((player) => (
          <View key={player.id} className="flex-row items-center mb-3">
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg p-3 mr-3"
              placeholder={`Player ${player.id} Name`}
              value={player.name}
              onChangeText={(text) => updatePlayer(player.id, 'name', text)}
            />
            <View className="flex-row items-center">
              <Text className="mr-2">Red Team</Text>
              <Switch
                value={player.isRedTeam}
                onValueChange={(value) => updatePlayer(player.id, 'isRedTeam', value)}
                trackColor={{ false: '#767577', true: '#ff6b6b' }}
                thumbColor={player.isRedTeam ? '#ff0000' : '#f4f3f4'}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Number of Rounds */}
      <View className="mb-8">
        <Text className="text-xl font-bold mb-4">Number of Rounds</Text>
        <View className="flex-row justify-around">
          {[3, 5, 10].map((rounds) => (
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

      {/* Start Button */}
      <TouchableOpacity 
        className="bg-green-500 p-4 rounded-lg items-center mb-10"
        onPress={handleStart}
      >
        <Text className="text-white text-xl font-bold">
          Start Game
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
} 