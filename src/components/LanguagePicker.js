import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguagePicker = ({ onLanguageSelect }) => {
  const selectLanguage = async (language) => {
    await AsyncStorage.setItem('selectedLanguage', language);
    onLanguageSelect(language);  // Trigger a re-render or other necessary updates
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your language</Text>
      <View style={styles.buttons}>
        <Button title="English" onPress={() => selectLanguage('en')} />
        <Button title="Albanian" onPress={() => selectLanguage('sq')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LanguagePicker;
