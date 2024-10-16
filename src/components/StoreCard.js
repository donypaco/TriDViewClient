import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StoreCard = ({ storeName, base64File, description, storeId }) => {
    const navigation = useNavigation();

    const handleViewStore = () => {
      navigation.navigate('StoreScreen', { storeId });
    };
  
  return (
    <View style={styles.card}>
      <Text style={styles.storeName}>{storeName}</Text>
      <Image source={{ uri: `data:image/jpeg;base64,${base64File}` }} resizeMode="contain" style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      <Button title="View Store" onPress={handleViewStore} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: '#333', // Darker text for better readability
  },
  image: {
    width: '100%',
    height: 50, // Fixed height for consistency
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default StoreCard;
