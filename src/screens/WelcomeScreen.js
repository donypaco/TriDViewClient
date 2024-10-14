import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import StoreRegistration from './StoreRegistration';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkFirstTimeUse = async () => {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      if (isFirstTime !== null) {
        navigation.navigate('Home');
      } else {
        await AsyncStorage.setItem('isFirstTime', 'false');
      }
    };
    checkFirstTimeUse();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you a Customer or a Store?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Customer" onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Store" onPress={() => navigation.navigate('Store Registration')} />
      </View>
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
