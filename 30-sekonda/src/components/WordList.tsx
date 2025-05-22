import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Word } from '../types';
import { colors, fontSize, borderRadius, spacing } from '../styles/theme';

interface WordListProps {
  words: Word[];
  onToggleWord: (id: number) => void;
}

export const WordList: React.FC<WordListProps> = ({ words, onToggleWord }) => {
  return (
    <View style={styles.wordsContainer}>
      {words.map((word) => (
        <TouchableOpacity
          key={word.id}
          style={[
            styles.wordCard, 
            word.checked ? styles.wordCardChecked : null
          ]}
          onPress={() => onToggleWord(word.id)}
        >
          <Text style={[
            styles.wordText,
            word.checked ? styles.wordTextChecked : null
          ]}>
            {word.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wordsContainer: {
    flex: 1,
    marginVertical: spacing.sm,
  },
  wordCard: {
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  wordCardChecked: {
    backgroundColor: colors.feedback.success,
  },
  wordText: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.primary,
  },
  wordTextChecked: {
    color: colors.text.dark,
  },
}); 