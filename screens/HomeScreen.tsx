import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import Variables from '../constants/Variables';
import { RootStackScreenProps } from '../types/Navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  },
});

export default function HomeScreen({
  navigation,
}: RootStackScreenProps<'Home'>) {
  const onBegin = () => {
    navigation.navigate('Quiz');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Trivia Challenge!</Text>
      <Text style={styles.text}>
        {`You will be presented with ${Variables.Count} True or False questions`}
      </Text>
      <Text style={styles.text}>Can you score 100%?</Text>
      <TouchableOpacity onPress={onBegin}>
        <Text style={styles.text}>BEGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
