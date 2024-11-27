import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BottomBar ({ state, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const handlePress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            onPress={handlePress}
            style={styles.tabContainer}
          >
            <Text style={[styles.tabText, isFocused && styles.focusedTabText]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow properties for iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#777',
    textTransform: 'uppercase',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  focusedTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
});