import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-5xl font-bold mb-10 text-blue-500">
        30 Sekonda
      </Text>
      <TouchableOpacity 
        className="bg-green-500 px-12 py-4 rounded-full shadow-lg"
        onPress={() => router.push('/setup')}
      >
        <Text className="text-white text-2xl font-bold">
          Play
        </Text>
      </TouchableOpacity>
    </View>
  );
} 