import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API_URLS } from '../constants/urls';
import { fetchData } from '../api/Api';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import SuccessScreen from './SuccessScreen';

const StoreRegistration = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        storeName: Yup.string().required(t('Store Name is required')),
        description: Yup.string().required(t('Description is required')),
        storeLocation: Yup.string().required(t('Location is required')),
        planID: Yup.string().required(t('Plan is required')),
    });

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
        const message = t('Your store has been registered successfully');
        const targetScreen = t('Home');
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
                setPlans(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching plans');
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <Formik
            initialValues={{
                storeName: '',
                description: '',
                storeLocation: '',
                planID: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Store Registration</Text>

                    <TextInput
                        placeholder={t('Store Name')}
                        onChangeText={handleChange('storeName')}
                        onBlur={handleBlur('storeName')}
                        value={values.storeName}
                        style={styles.input}
                    />
                    {touched.storeName && errors.storeName && <Text style={styles.error}>{errors.storeName}</Text>}

                    <TextInput
                        placeholder={t('Description')}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        style={styles.input}
                    />
                    {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}

                    <TextInput
                        placeholder={t('Location')}
                        onChangeText={handleChange('storeLocation')}
                        onBlur={handleBlur('storeLocation')}
                        value={values.storeLocation}
                        style={styles.input}
                    />
                    {touched.storeLocation && errors.storeLocation && <Text style={styles.error}>{errors.storeLocation}</Text>}

                    <Text style={styles.label}>Select a Plan</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setFieldValue('planID', value)} 
                        items={plans.map(plan => ({ label: plan.planName, value: plan.id }))}
                        placeholder={{
                            label: t('Select a Plan'),
                            value: null,
                        }}
                        style={{
                            inputIOS: styles.dropdownButton,
                            inputAndroid: styles.dropdownButton,
                            placeholder: styles.dropdownButtonText,
                        }}
                        value={values.planID} // Bind the selected value to Formik's value
                    />
                    {touched.planID && errors.planID && <Text style={styles.error}>{errors.planID}</Text>}

                    <View style = {styles.imageContainer}>
                        <Button title={t('Pick an image from the gallery')}  onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />}
                    </View>

                    <Button title={t('Submit')} onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    dropdownButton: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    dropdownButtonText: {
        color: 'black',
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10, 
        marginTop: 10
    },
    imageContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StoreRegistration;
