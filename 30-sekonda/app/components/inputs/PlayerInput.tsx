import React from 'react';
import { View, TextInput, Text, Switch } from 'react-native';
import { Player } from '../../types';
import { colors } from '../../styles/theme';

interface PlayerInputProps {
  player: Player;
  onUpdate: (id: number, field: keyof Player, value: string | boolean) => void;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({ player, onUpdate }) => {
  return (
    <View className="flex-row items-center mb-4">
      <TextInput
        className="flex-1 bg-[#1E1E34] border-0 rounded-lg p-4 mr-3 text-[#F8F9FA]"
        placeholder={`Player ${player.id}`}
        placeholderTextColor="#6C757D"
        value={player.name}
        onChangeText={(text) => onUpdate(player.id, 'name', text)}
      />
      <View className="flex-row items-center bg-[#1E1E34] py-2 px-3 rounded-lg">
        <Text className="mr-2 text-[#F8F9FA]">
          {player.isRedTeam ? '🔴' : '🔵'}
        </Text>
        <Switch
          value={player.isRedTeam}
          onValueChange={(value) => onUpdate(player.id, 'isRedTeam', value)}
          trackColor={{ false: '#4361EE', true: '#FF4D6D' }}
          thumbColor={player.isRedTeam ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </View>
  );
}; 