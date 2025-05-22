import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Word {
  id: number;
  text: string;
  checked: boolean;
}

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
    marginVertical: 8,
  },
  wordCard: {
    backgroundColor: '#1E1E34',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  wordCardChecked: {
    backgroundColor: '#06D6A0',
  },
  wordText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F8F9FA',
  },
  wordTextChecked: {
    color: '#1A1A2E',
  },
}); 