import React from 'react';
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
              headerStyle: { backgroundColor: '#043' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen
              name="Details"
              component={HomeScreen}
              options={{ title: 'Detail Information' }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

export default AppNavigator;