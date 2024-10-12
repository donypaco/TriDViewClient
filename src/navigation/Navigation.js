import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
// import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#333333' },
              headerTintColor: '#000',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
        <Stack.Screen name="Home" component={HomeScreen} /></Stack.Navigator>
        </NavigationContainer >
      );
    }
    const styles = StyleSheet.create({
    });
export default AppNavigator;