import React from 'react';
import { Modal, View, Text } from 'react-native';
import { GameModalProps } from '../../types';
import { NextButton } from '../buttons/NextButton';

export const GameModal: React.FC<GameModalProps> = ({ 
  visible, 
  isSuccess, 
  onNext 
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg items-center">
          <Text className="text-2xl font-bold mb-5">
            {isSuccess ? 'Success!' : 'Time\'s Up!'}
          </Text>
          <NextButton onPress={onNext} />
        </View>
      </View>
    </Modal>
  );
}; 