import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, SafeAreaView,TouchableOpacity } from 'react-native';
import { fetchData, fetchStores } from '../api/Api';
import StoreCard from '../components/StoreCard';
import { API_URLS } from "../constants/urls";

const HomeScreen = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStores = async () => {
      try {
        // const data = await fetchStores();
        const data = await fetchData(API_URLS.STORES);
        setStores(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);
  const handleViewStore = (storeId) => {
    navigation.navigate('Store', { storeId });  // Pass storeId as a parameter
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: '#FFFFFF' }}>
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StoreCard storeName={item.storeName}
           base64File={item.base64File} 
           description={item.description} 
           storeId={item.id} />
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  item: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200, height: 200
  }
});

export default HomeScreen;