import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LanguagePicker from '../components/LanguagePicker';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [languageSelected, setLanguageSelected] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkFirstTimeUse = async () => {
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage); // Load selected language
        }

        if (isFirstTime !== null) {
            navigation.navigate('Home');
        } else {
            await AsyncStorage.setItem('isFirstTime', 'false');
        }
    };

    checkFirstTimeUse();
}, [navigation]);


const handleLanguageSelect = async (language) => {
  await AsyncStorage.setItem('selectedLanguage', language);
  setLanguageSelected(true);
  i18n.changeLanguage(language);
};

  return (
    <View style={styles.container}>
      {!languageSelected && <LanguagePicker onLanguageSelect={handleLanguageSelect} />}
        <>
          <Text style={styles.title}>{t('welcome')}</Text>
          <View style={styles.buttonContainer}>
            <Button title={t('customer')} onPress={() => navigation.navigate('Home')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title={t('store')} onPress={() => navigation.navigate('Store Registration')} />
          </View>
        </>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: '#333',
    },
    buttonContainer: {
      marginBottom: 20,
      width: '80%',
    },
  });
  

export default WelcomeScreen;
