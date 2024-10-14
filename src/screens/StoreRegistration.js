import React, { useEffect, useState } from 'react'; // Added useEffect and useState
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API_URLS } from '../constants/urls';
import { fetchData } from '../api/Api';
import SelectDropdown from 'react-native-select-dropdown'; // Importing SelectDropdown

const StoreRegistration = () => {
    const [plans, setPlans] = useState([]);
  
    const validationSchema = Yup.object().shape({
        storeName: Yup.string().required('Store Name is required'),
        description: Yup.string().required('Description is required'),
        storeLocation: Yup.string().required('Location is required'),
        contactEmail: Yup.string().email('Invalid email').required('Email is required'),
        plan: Yup.string().required('Plan is required'),
    });

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await fetchData(API_URLS.PLANS); 
                setPlans(data);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, []);

    return (
        <Formik
            initialValues={{
                storeName: '',
                description: '',
                storeLocation: '',
                contactEmail: '',
                plan: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Store Registration</Text>

                    <TextInput
                        placeholder="Store Name"
                        onChangeText={handleChange('storeName')}
                        onBlur={handleBlur('storeName')}
                        value={values.storeName}
                        style={styles.input}
                    />
                    {touched.storeName && errors.storeName && <Text style={styles.error}>{errors.storeName}</Text>}

                    <TextInput
                        placeholder="Description"
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        style={styles.input}
                    />
                    {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}

                    <TextInput
                        placeholder="Location"
                        onChangeText={handleChange('storeLocation')}
                        onBlur={handleBlur('storeLocation')}
                        value={values.storeLocation}
                        style={styles.input}
                    />
                    {touched.storeLocation && errors.storeLocation && <Text style={styles.error}>{errors.storeLocation}</Text>}

                    <TextInput
                        placeholder="Contact Email"
                        onChangeText={handleChange('contactEmail')}
                        onBlur={handleBlur('contactEmail')}
                        value={values.contactEmail}
                        style={styles.input}
                        keyboardType="email-address"
                    />
                    {touched.contactEmail && errors.contactEmail && <Text style={styles.error}>{errors.contactEmail}</Text>}

                    {/* Dropdown for plans using SelectDropdown */}
                    <Text style={styles.label}>Select a Plan</Text>
                    <SelectDropdown
                        data={plans.map(plan => ({ label: plan.planName, value: plan.id }))} // Formatting data for dropdown
                        onSelect={(selectedItem, index) => {
                            handleChange('plan')(selectedItem.value); // Update formik state
                        }}
                        buttonTextAfterSelection={(selectedItem) => selectedItem.label} // Display label after selection
                        rowTextForSelection={(item) => item.label} // Display label in dropdown
                        buttonStyle={styles.dropdownButton}
                        buttonTextStyle={styles.dropdownButtonText}
                        dropdownStyle={styles.dropdown}
                        rowStyle={styles.dropdownRow}
                        rowTextStyle={styles.dropdownRowText}
                    />
                    {touched.plan && errors.plan && <Text style={styles.error}>{errors.plan}</Text>}

                    <Button title="Submit" onPress={handleSubmit} />
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
    dropdown: {
        backgroundColor: 'white',
    },
    dropdownRow: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    dropdownRowText: {
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
});

export default StoreRegistration;
