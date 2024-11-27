import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
// Import your screens
import HomeScreen from '../screens/HomeScreen';
import StoreScreen from '../screens/StoreScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import StoreRegistrationScreen from '../screens/StoreRegistrationScreen';
import LanguagePicker from '../components/LanguagePicker';
import SuccessScreen from '../screens/SuccessScreen';
import BottomBar from '../components/BottomBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProductRegistration from '../screens/ProductRegistration';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomBar {...props} />} // Custom bottom bar
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Store Registration" component={StoreRegistrationScreen} />
      <Tab.Screen name="Product Registration" component={ProductRegistration} />

    </Tab.Navigator>
  );
}

function AppNavigator() {
  const [isLanguageSelected, setIsLanguageSelected] = useState(null);
  const {t} = useTranslation();

  // Check if language is already set in AsyncStorage
  useEffect(() => {
    const checkLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        await i18n.changeLanguage(storedLanguage);
        setIsLanguageSelected(true);
      } else {
        setIsLanguageSelected(false);
      }
    };
    checkLanguage();
  }, []);

  const handleLanguageSelection = () => {
    setIsLanguageSelected(true);
  };

  if (!isLanguageSelected) {
    return <LanguagePicker onLanguageSelected={handleLanguageSelection} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default AppNavigator;