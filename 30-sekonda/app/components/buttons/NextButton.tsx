import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface NextButtonProps {
  onPress: () => void;
  text?: string;
  className?: string;
}

export const NextButton: React.FC<NextButtonProps> = ({ 
  onPress, 
  text = 'Next',
  className = ''
}) => {
  return (
    <TouchableOpacity 
      className={`bg-[#4361EE] px-8 py-3 rounded-lg ${className}`}
      onPress={onPress}
    >
      <Text className="text-white text-lg font-bold text-center">
        {text}
      </Text>
    </TouchableOpacity>
  );
}; 

export default NextButton;