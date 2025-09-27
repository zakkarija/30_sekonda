import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      {/* Title section */}
      <View style={styles.titleContainer}>
        <Text style={styles.titlePrimary}>30</Text>
        <Text style={styles.titleSecondary}>Sekonda</Text>
        <Text style={styles.subtitle}>The fast-paced party game!</Text>
      </View>
      
      {/* Game info cards */}
      <View style={styles.cardsContainer}>
        <View style={[styles.card, {borderLeftColor: '#FF4D6D'}]}>
          <Text style={styles.cardText}>⏱️ 30 seconds to describe</Text>
        </View>
        <View style={[styles.card, {borderLeftColor: '#4361EE'}]}>
          <Text style={styles.cardText}>🎮 Play in teams</Text>
        </View>
        <View style={[styles.card, {borderLeftColor: '#06D6A0'}]}>
          <Text style={styles.cardText}>🎉 Fun for everyone!</Text>
        </View>
      </View>
      
      {/* Play button */}
      <TouchableOpacity 
        style={styles.playButton}
        onPress={() => router.push('/setup')}
      >
        <Text style={styles.buttonText}>PLAY NOW</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 48,
    alignItems: 'center',
  },
  titlePrimary: {
    fontSize: 60,
    fontWeight: '800',
    color: '#FF4D6D',
  },
  titleSecondary: {
    fontSize: 60,
    fontWeight: '800',
    color: '#4CC9F0',
    marginTop: -8,
  },
  subtitle: {
    fontSize: 14,
    color: '#F8F9FA',
    marginTop: 8,
    textAlign: 'center',
  },
  cardsContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 48,
  },
  card: {
    backgroundColor: '#1E1E34',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  cardText: {
    color: '#F8F9FA',
    fontWeight: '500',
  },
  playButton: {
    backgroundColor: '#FF4D6D',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 