import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StoreCard = ({ storeName, base64File, description, storeId }) => {
  const navigation = useNavigation();

  const handleViewStore = () => {
    navigation.navigate('StoreScreen', { storeId });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleViewStore}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${base64File}` }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#FFFFFF', // Zara-like white background
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150, // Fixed height while maintaining width
    resizeMode: 'cover', // Ensures the image fills the space proportionally
  },
  textContainer: {
    padding: 12,
    alignItems: 'center',
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333', // Neutral dark gray
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666', // Subtle gray for the description
    textAlign: 'center',
  },
});

export default StoreCard;