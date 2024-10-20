import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import LogoUploader from '../components/LogoUploader';

const StoreRegistrationForm = ({ plans }) => {
    const validationSchema = Yup.object().shape({
        storeName: Yup.string().required('Store Name is required'),
        description: Yup.string().required('Description is required'),
        storeLocation: Yup.string().required('Location is required'),
        contactEmail: Yup.string().email('Invalid email').required('Email is required'),
        plan: Yup.string().required('Plan is required'),
        logoKey: Yup.string().required('Logo is required'),
        base64File: Yup.string().required('Base64 file is required'),
    });

    const handleFormSubmit = async (values) => {
        // Your form submission logic
    };

    return (
        <Formik
            initialValues={{
                storeName: '',
                description: '',
                storeLocation: '',
                contactEmail: '',
                plan: '',
                logoKey: '',
                base64File: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View>
                    <TextInput
                        placeholder="Store Name"
                        onChangeText={handleChange('storeName')}
                        onBlur={handleBlur('storeName')}
                        value={values.storeName}
                        style={styles.input}
                    />
                    {/* Other TextInputs and validation messages */}

                    <RNPickerSelect
                        onValueChange={(value) => setFieldValue('plan', value)}
                        items={plans.map(plan => ({ label: plan.planName, value: plan.id }))}
                    />
                    {/* Plan selection and validation messages */}

                    <LogoUploader setFieldValue={setFieldValue} />

                    <Button title="Submit" onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
});

export default StoreRegistrationForm;