import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { fetchStores } from '../api/Api';

const HomeScreen = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStores = async () => {
      try {
        const data = await fetchStores();
        setStores(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.storeName}>{item.storeName}</Text>
          </View>
        )}
        numColumns={2} // Two columns
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#f9f9f9',
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
});

export default HomeScreen;