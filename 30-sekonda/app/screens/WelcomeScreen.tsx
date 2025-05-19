import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { NextButton } from '../components/buttons/NextButton';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-5xl font-bold mb-10 text-blue-500">
        30 Sekonda
      </Text>
      <NextButton 
        text="Play" 
        onPress={() => router.push('/setup')}
        className="bg-green-500 px-12"
      />
    </View>
  );
} 