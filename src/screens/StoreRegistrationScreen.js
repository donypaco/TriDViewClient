import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API_URLS } from '../constants/urls';
import { fetchData } from '../api/Api';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FillingForm from '../components/FillingForm';

export default function StoreRegistrationScreen () {
    const [plans, setPlans] = useState([]);
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const { t } = useTranslation();

    const storeRegistrationFields = [
        { name: "storeName", label: "Store Name", placeholder: "Enter store name",type: 'text',  required: true },
        { name: "description", label: "Description", placeholder: "Enter a description",type: 'text',  required: true },
        { name: "storeLocation", label: "Location", placeholder: "Enter a location",type: 'text',  required: true },
        { 
            name: "planId", 
            label: "Plan",
            placeholder: "Enter a plan",
            type: 'dropdown',
            value: 1,
            required: true, 
            options: plans
        },
    ];
    const handleStoreSubmit = (data) => {
        console.log("Store Data Submitted:", data);
    };

    const handleFormSubmit = async (values) => {
        try {
            const formData = new FormData();

            // Append other form data
            formData.append('storeName', values.storeName);
            formData.append('description', values.description);
            formData.append('storeLocation', values.storeLocation);
            formData.append('planID', values.planID);

            // Append the image file
            if (image) {
                formData.append('formFile', {
                    uri: image,
                    name: image.split('/').pop(),
                    type: 'image/jpeg'
                });
            }
            console.log(formData)
            const response = await fetch(`${API_URLS.REGISTER_STORE}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || t('FailedToRegisterStore'));
                return;
            }
            //     Alert.alert('Success',t('Your store has been registered successfully'), [
            //         { text: 'OK', onPress: () => navigation.navigate('Home') } // Redirect to store list or homepage
            //     ]
            // );
            await AsyncStorage.setItem('isRegistered', 'true');
            const message = t('Your store has been registered successfully');
            const targetScreen = t('MainTabs');
            navigation.navigate('Success', { message, targetScreen }); // Pass parameters

        } catch (error) {
            Alert.alert('Error', error.message || t('An unexpected error occurred'));
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await fetchData(API_URLS.PLANS);
                setPlans(data.map(plan => ({ id: plan.id, name: plan.planName })));
                // setLoading(false);
                console.log(plans)
            } catch (error) {
                setError('Error fetching plans');
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Register a New Store</Text>
                <FillingForm fields={storeRegistrationFields} onSubmit={handleStoreSubmit} title = 'Register a New Store' />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f4f4f4", // Matches the rest of the design
    },
    container: {
        flex: 1, // Takes the entire screen
        padding: 24, // Comfortable padding around content
        backgroundColor: "#f4f4f4", // Neutral light-grey background
        justifyContent: "center", // Centers content vertically
    },
    title: {
        fontSize: 24, // Large, bold title text
        fontWeight: "bold",
        color: "#000", // Dark color for sharp contrast
        textAlign: "center", // Center the title horizontally
        marginBottom: 16, // Space between the title and the form
        letterSpacing: 1, // Subtle spacing for elegance
        textTransform: "uppercase", // Modern sharp typography style
    },
});