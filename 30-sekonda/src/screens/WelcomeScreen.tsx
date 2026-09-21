import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { HelpModal } from '../components';
import { colors } from '../styles/theme';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const [showHelp, setShowHelp] = useState(false);

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
        <View style={[styles.card, {borderLeftColor: colors.team.red}]}>
          <Text style={styles.cardText}>⏱️ 30 seconds to describe 5 words</Text>
        </View>
        <View style={[styles.card, {borderLeftColor: colors.team.blue}]}>
          <Text style={styles.cardText}>🎮 Pass the phone, play in teams</Text>
        </View>
        <View style={[styles.card, {borderLeftColor: colors.feedback.success}]}>
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

      {/* How to play */}
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => setShowHelp(true)}
      >
        <Text style={styles.helpButtonText}>How to play</Text>
      </TouchableOpacity>

      <HelpModal visible={showHelp} onClose={() => setShowHelp(false)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
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
    color: colors.team.red,
  },
  titleSecondary: {
    fontSize: 60,
    fontWeight: '800',
    color: colors.feedback.info,
    marginTop: -8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  cardsContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 48,
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  cardText: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  playButton: {
    backgroundColor: colors.team.red,
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
  helpButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  helpButtonText: {
    color: colors.feedback.info,
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
