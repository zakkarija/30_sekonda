import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../../styles/theme';

interface PlayerCountButtonProps {
  onPress: () => void;
  type: 'increment' | 'decrement';
}

export const PlayerCountButton: React.FC<PlayerCountButtonProps> = ({ 
  onPress, 
  type 
}) => {
  return (
    <TouchableOpacity 
      className={`w-12 h-12 rounded-full justify-center items-center ${
        type === 'increment' ? 'bg-[#06D6A0]' : 'bg-[#F72585]'
      }`}
      onPress={onPress}
    >
      <Text className="text-white text-2xl font-bold">
        {type === 'increment' ? '+' : '-'}
      </Text>
    </TouchableOpacity>
  );
}; 