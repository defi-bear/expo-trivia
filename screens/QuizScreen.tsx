import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { decode } from 'html-entities';

import getTriviaData from '../api';
import { RootStackScreenProps } from '../types/Navigation';
import { Text, View, TouchableOpacity } from '../components/Themed';
import { TriviaResponse, TriviaResult } from '../types/Trivia';
import Variables from '../constants/Variables';
import useThemeColor from '../hooks/useThemeColor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 50,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  questionContainer: {
    width: 300,
    height: 300,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  question: {
    fontSize: 20,
  },
  indexText: {
    fontSize: 16,
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default function QuizScreen({
  navigation,
}: RootStackScreenProps<'Quiz'>) {
  const [triviaData, setTriviaData] = useState<TriviaResult[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const indicatorColor = useThemeColor({}, 'indicator');

  const getTrivia = useCallback(async () => {
    const result = (await getTriviaData()) as TriviaResponse;
    if (result.response_code === 0) {
      setTriviaData(result.results);
      setAnswers([]);
    }
  }, []);

  useEffect(() => {
    getTrivia();
  }, [getTrivia]);

  const next = (backedAnswers: string[]) => {
    if (index === Variables.Count - 1) {
      const params = {
        triviaData,
        answers: backedAnswers,
      };
      navigation.navigate('Result', params);
    } else {
      setIndex((prev) => prev + 1);
      setAnswers(backedAnswers);
    }
  };

  const onYes = () => {
    const backedAnswers = [...answers];
    backedAnswers.push('True');
    next(backedAnswers);
  };

  const onNo = () => {
    const backedAnswers = [...answers];
    backedAnswers.push('False');
    next(backedAnswers);
  };

  return (
    <View style={styles.container}>
      {triviaData.length === 0 ? (
        <ActivityIndicator size="large" color={indicatorColor} />
      ) : (
        <View style={styles.mainContainer}>
          <Text style={styles.category}>{triviaData[index].category}</Text>
          <View>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>
                {decode(triviaData[index].question)}
              </Text>
            </View>
            <Text style={styles.indexText}>
              {`${index + 1} of ${Variables.Count}`}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onYes}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onNo}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
