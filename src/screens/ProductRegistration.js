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
import FillingForm from '../components/FillingForm';

const ProductRegistration = () => {
    const [categories, setCategories] = useState([]);
    const storeRegistrationFields = [
        { name: "name", label: "Product Name", placeholder: "Enter product name",type: 'text',  required: true },
        { name: "description", label: "Description", placeholder: "Enter a description",type: 'text',  required: true },
        { name: "price", label: "Price", placeholder: "Price",type: 'text',  required: true },
        { name: "quantity", label: "Quantity", placeholder: "Quantity",type: 'text',  required: true },
        { name: "height", label: "Height", placeholder: "Height",type: 'text',  required: true },
        { name: "width", label: "Width", placeholder: "Width",type: 'text',  required: true },
        { 
            name: "categoryID", 
            label: "Category",
            placeholder: "Select a category",
            type: 'dropdown',
            value: 1,
            required: true, 
            options: categories
        },
    ];

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('Product Name is required')),
        description: Yup.string().required(t('Description is required')),
        price: Yup.string().required(t('Price is required')),
        quantity: Yup.string().required(t('Quantity is required')),
        height: Yup.string().required(t('Height is required')),
        width: Yup.string().required(t('Width is required')),
        isActive: Yup.string().required(t('Will the product be Active?')),
        planID: Yup.string().required(t('Category is required'))
    });

    const handleFormSubmit = async (values) => {
        try {
            const formData = new FormData();
            
            // Append other form data
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('quantity', values.quantity);
            formData.append('height', values.height);
            formData.append('width', values.width);
            formData.append('isActive', values.isActive);

            formData.append('categoryID', values.categoryID);
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
        const message = t('Your product has been registered successfully');
        const targetScreen = t('Home');
        navigation.navigate('MainTabs', { message, targetScreen }); // Pass parameters
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
        const fetchCategories = async () => {
            try {
                const data = await fetchData(API_URLS.CATEGORIES);
                setCategories(data.map(category => ({ id: category.id, name: category.categoryName })));
                console.log(categories)
                setLoading(false);
            } catch (error) {
                setError('Error fetching categories');
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);
    return (
        // <Formik
        //     initialValues={{
        //         name: '',
        //         description: '',
        //         price: '',
        //         quantity: '',
        //         height: '',
        //         width: '',
        //         weight: '',
        //         isActive: '',
        //         categoryID: '',
        //     }}
        //     validationSchema={validationSchema}
        //     onSubmit={handleFormSubmit}
        // >
        //     {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        //         <View style={styles.container}>
        //             <Text style={styles.title}>Products Registration</Text>
        //             <TextInput
        //                 placeholder={t('Product Name')}
        //                 onChangeText={handleChange('name')}
        //                 onBlur={handleBlur('name')}
        //                 value={values.name}
        //                 style={styles.input}
        //             />
        //             {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
        //             <TextInput
        //                 placeholder={t('Description')}
        //                 onChangeText={handleChange('description')}
        //                 onBlur={handleBlur('description')}
        //                 value={values.description}
        //                 style={styles.input}
        //             />
        //             {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}
        //             <TextInput
        //                 placeholder={t('price')}
        //                 onChangeText={handleChange('price')}
        //                 onBlur={handleBlur('price')}
        //                 value={values.price}
        //                 style={styles.input}
        //             />
        //             {touched.quantity && errors.quantity && <Text style={styles.error}>{errors.quantity}</Text>}
        //             <TextInput
        //                 placeholder={t('quantity')}
        //                 onChangeText={handleChange('quantity')}
        //                 onBlur={handleBlur('quantity')}
        //                 value={values.quantity}
        //                 style={styles.input}
        //             />
        //             {touched.quantity && errors.quantity && <Text style={styles.error}>{errors.quantity}</Text>}
        //             <TextInput
        //                 placeholder={t('height')}
        //                 onChangeText={handleChange('height')}
        //                 onBlur={handleBlur('height')}
        //                 value={values.height}
        //                 style={styles.input}
        //             />
        //             {touched.height && errors.height && <Text style={styles.error}>{errors.height}</Text>}

        //             <TextInput
        //                 placeholder={t('width')}
        //                 onChangeText={handleChange('width')}
        //                 onBlur={handleBlur('width')}
        //                 value={values.width}
        //                 style={styles.input}
        //             />
        //             {touched.width && errors.width && <Text style={styles.error}>{errors.width}</Text>}
        //             <TextInput
        //                 placeholder={t('width')}
        //                 onChangeText={handleChange('width')}
        //                 onBlur={handleBlur('width')}
        //                 value={values.width}
        //                 style={styles.input}
        //             />
        //             {touched.width && errors.width && <Text style={styles.error}>{errors.width}</Text>}

        //             <TextInput
        //                 placeholder={t('isActive')}
        //                 onChangeText={handleChange('isActive')}
        //                 onBlur={handleBlur('isActive')}
        //                 value={values.isActive}
        //                 style={styles.input}
        //             />
        //             {touched.isActive && errors.isActive && <Text style={styles.error}>{errors.isActive}</Text>}

        //             <Text style={styles.label}>Select a Category</Text>
        //             <RNPickerSelect
        //                 onValueChange={(value) => setFieldValue('CategoryID', value)} 
        //                 items={categories.map(category => ({ label: category.categoryName, value: category.id }))}
        //                 placeholder={{
        //                     label: t('Select a Category'),
        //                     value: null,
        //                 }}
        //                 style={{
        //                     ...styles.picker,
        //                     viewContainer: { zIndex: 1000 }, // Ensures dropdown is clickable
        //                 }}
        //                 value={values.cateogryID}
        //             />
        //             {touched.categoryID && errors.categoryID && <Text style={styles.error}>{errors.categoryID}</Text>}

        //             <View style = {styles.imageContainer}>
        //                 <Button title={t('Pick an image from the gallery')}  onPress={pickImage} />
        //                 {image && <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />}
        //             </View>
        //             <Button title={t('Submit')} onPress={handleSubmit} />
        //         </View>
        //     )}
        // </Formik>
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Text style={styles.title}>Register a New Product</Text>
            <FillingForm fields={storeRegistrationFields} title = 'Register a New Product' />
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
export default ProductRegistration;