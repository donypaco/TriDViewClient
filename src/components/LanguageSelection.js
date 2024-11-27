// src/screens/LanguageSelection.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

const LanguageSelection = ({ navigation }) => {
  const setLanguage = async (language) => {
    await AsyncStorage.setItem('appLanguage', language);
    i18n.changeLanguage(language);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Language</Text>
      <Button title="English" onPress={() => setLanguage('en')} />
      <Button title="Shqip" onPress={() => setLanguage('sq')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default LanguageSelection;