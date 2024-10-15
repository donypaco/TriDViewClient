import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

const StoreScreen = () => {
    const route = useRoute();
    const { storeId } = route.params;
    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    return (
      <View>
            <Text>Welcome to store {storeId}</Text>
      </View>
    );
  };

export default StoreScreen;
