import React from 'react';
import { View, TextInput, Text, Switch } from 'react-native';
import { Player } from '../../types';

interface PlayerInputProps {
  player: Player;
  onUpdate: (id: number, field: keyof Player, value: string | boolean) => void;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({ player, onUpdate }) => {
  return (
    <View className="flex-row items-center mb-3">
      <TextInput
        className="flex-1 border border-gray-300 rounded-lg p-3 mr-3"
        placeholder={`Player ${player.id} Name`}
        value={player.name}
        onChangeText={(text) => onUpdate(player.id, 'name', text)}
      />
      <View className="flex-row items-center">
        <Text className="mr-2">Red Team</Text>
        <Switch
          value={player.isRedTeam}
          onValueChange={(value) => onUpdate(player.id, 'isRedTeam', value)}
          trackColor={{ false: '#767577', true: '#ff6b6b' }}
          thumbColor={player.isRedTeam ? '#ff0000' : '#f4f3f4'}
        />
      </View>
    </View>
  );
}; 