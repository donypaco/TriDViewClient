import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
// Import your screens
import HomeScreen from '../screens/HomeScreen';
import StoreScreen from '../screens/StoreScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import StoreRegistration from '../screens/StoreRegistration';
import LanguagePicker from '../components/LanguagePicker'; // Import LanguagePicker
import SuccessScreen from '../screens/SuccessScreen';
const Stack = createStackNavigator();

function AppNavigator() {
  const [isLanguageSelected, setIsLanguageSelected] = useState(null);
  const {t} = useTranslation();
  // Check if language is already set in AsyncStorage
  useEffect(() => {
    const checkLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        await i18n.changeLanguage(storedLanguage);
        setIsLanguageSelected(true); // Language already selected
      } else {
        setIsLanguageSelected(false); // No language selected, show picker
      }
    };
    checkLanguage();
  }, []);

  // if (isLanguageSelected === null) {
  //   return null; // You can show a loading screen while checking language
  // }
  const handleLanguageSelection = () => {
    setIsLanguageSelected(true);
  };
  if (!isLanguageSelected) {
    return <LanguagePicker onLanguageSelected={handleLanguageSelection} />;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Store Registration" component={StoreRegistration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default AppNavigator;
