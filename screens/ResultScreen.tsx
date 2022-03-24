import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { decode } from 'html-entities';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps, RootRouteProps } from '../types/Navigation';
import Variables from '../constants/Variables';
import { TriviaResult } from '../types/Trivia';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    marginVertical: 30,
  },
  questionWrapper: {
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbol: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 20,
  },
  questionText: {
    fontSize: 20,
    flexShrink: 1,
  },
  text: {
    fontSize: 20,
  },
});

export default function ResultScreen({
  navigation,
}: RootStackScreenProps<'Result'>) {
  const route = useRoute<RootRouteProps<'Result'>>();

  const onAgain = () => {
    navigation.navigate('Home');
  };

  const getRightCount = () => {
    const {
      params: { answers, triviaData },
    } = route;
    return triviaData.filter(
      (trivia, index) => trivia.correct_answer === answers[index],
    ).length;
  };

  const renderTrivia: ListRenderItem<TriviaResult> = ({ item, index }) => (
    <View style={styles.questionWrapper}>
      <Text style={styles.symbol}>
        {item.correct_answer === route?.params?.answers[index] ? '✓' : 'X'}
      </Text>
      <Text style={styles.questionText}>{decode(item.question)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>You scored</Text>
        <Text style={styles.title}>
          {`${getRightCount()}/${Variables.Count}`}
        </Text>
      </View>
      <View style={styles.scrollContainer}>
        <FlatList<TriviaResult>
          data={route?.params?.triviaData}
          renderItem={renderTrivia}
          keyExtractor={(item) => item.question}
        />
      </View>
      <TouchableOpacity onPress={onAgain}>
        <Text style={styles.text}>PLAY AGAIN?</Text>
      </TouchableOpacity>
    </View>
  );
}
