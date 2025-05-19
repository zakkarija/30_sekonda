import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

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
      className="bg-blue-500 w-10 h-10 rounded-full justify-center items-center"
      onPress={onPress}
    >
      <Text className="text-white text-2xl font-bold">
        {type === 'increment' ? '+' : '-'}
      </Text>
    </TouchableOpacity>
  );
}; 