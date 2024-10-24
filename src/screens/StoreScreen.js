import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import i18n from '../i18n';
import { useTranslation

 } from 'react-i18next';
const StoreScreen = () => {
    const route = useRoute();
    const { storeId } = route.params;
    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    return (
      <View>
            <Text>{t('Welcome to store')} {storeId}</Text>
      </View>
    );
  };

export default StoreScreen;
