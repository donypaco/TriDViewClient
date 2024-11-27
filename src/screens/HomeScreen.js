import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, View } from 'react-native';
import { fetchData } from '../api/Api';
import { API_URLS } from "../constants/urls";

const StoreCard = ({ storeName, base64File, description, storeId }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <Image
        source={{ uri: `data:image/png;base64,${base64File}` }}
        style={styles.image}
      />
      <Text style={styles.storeName}>{storeName}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStores = async () => {
      try {
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

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StoreCard
            storeName={item.storeName}
            base64File={item.base64File}
            description={item.description}
            storeId={item.id}
          />
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
    backgroundColor: '#FAFAFA', // Light background
  },
  item: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF', // White card background
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 4, // Subtle shadow for Android
    shadowColor: '#000', // Subtle shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600', // Slightly bold
    color: '#222', // Dark text
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover', // Maintain aspect ratio
  },
  description: {
    fontSize: 14,
    fontWeight: '400', // Regular weight
    color: '#555', // Muted text
    textAlign: 'center',
  },
});


export default HomeScreen;