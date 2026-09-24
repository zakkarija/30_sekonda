import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Word } from '../types';
import { colors, fontSize, borderRadius, spacing } from '../styles/theme';

interface WordListProps {
  words: Word[];
  onToggleWord: (id: number) => void;
  /** Right-to-left script (Arabic, Urdu): align word text accordingly. */
  isRTL?: boolean;
}

export const WordList: React.FC<WordListProps> = ({ words, onToggleWord, isRTL = false }) => {
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
          testID="word-card"
          // A word card is a toggle: tick it off once the team guesses it.
          // The checkbox role exposes that state to screen readers.
          accessibilityRole="checkbox"
          accessibilityState={{ checked: word.checked }}
          accessibilityLabel={word.text}
        >
          <Text
            style={[
              styles.wordText,
              { writingDirection: isRTL ? 'rtl' : 'ltr' },
              word.checked ? styles.wordTextChecked : null
            ]}
            // Let long entries shrink rather than wrap off the card.
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
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
