import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import StoreScreen from '../screens/StoreScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import StoreRegistration from '../screens/StoreRegistration';
const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="Store Registration" component={StoreRegistration} />
      </Stack.Navigator>

        </NavigationContainer >
      );
    }
    const styles = StyleSheet.create({
    });
export default AppNavigator;