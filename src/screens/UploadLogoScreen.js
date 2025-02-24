import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    Button,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { fetchData } from '../api/Api';
import { API_URLS } from '../constants/urls';

const UploadLogoScreen = ({ onUpload, previewSize = 150 }) => {
    const [imageUri, setImageUri] = useState(null);

    const pickImage = async () => {
        console.log("hapur - Function triggered");
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImageUri(result.assets[0]);
            }
        } catch (error) {
            console.error("Error in ImagePicker:", error);
        }
    };
    const saveImage = async () => {
        if (!imageUri) {
            Alert.alert("Error", "Please select an image first.");
            return;
        }

        try {
            const formData = new FormData();
            
            formData.append('formFile', {
                uri: imageUri.uri,
                name: imageUri.uri.split('/').pop(), // Extract the filename from the URI
                type: 'image/jpeg' // Adjust this if you know the MIME type of your image
            });
            const storeId = 17; 
            const uploadUrl = API_URLS.UPLOAD_LOGO.replace("${storeId}", storeId);
            const response = await fetch(`${uploadUrl}`, {
                method: 'POST',
                body: formData, // Send the FormData as the body
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to register store');
                return;
            }
            Alert.alert('Success', 'Your store has been registered successfully!', [
                { text: 'OK' }
            ]);
        } catch (error) {
            console.error('Upload error:', error);
            Alert.alert('Error', 'An error occurred during the upload.');
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Logo</Text>
            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri.uri }}
                        style={[styles.image, { width: previewSize, height: previewSize, borderRadius: previewSize / 2 }]}
                    />
                ) : (
                    <View
                        style={[
                            styles.placeholder,
                            { width: previewSize, height: previewSize, borderRadius: previewSize / 2 },
                        ]}
                    >
                        <Text style={styles.placeholderText}>Tap to select image</Text>
                    </View>
                )}
            </TouchableOpacity>
            <View style={styles.buttonWrapper}>
                <Button title="Save" onPress={saveImage} color="#000" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff', 
    },
    title: {
        fontSize: 24, // Slightly larger for emphasis
        fontWeight: '500', // Use medium font weight for subtler emphasis
        marginBottom: 30, // Increased margin for clean spacing
        color: '#000000', // Black for text color
    },
    imageContainer: {
        marginBottom: 30, // Consistent spacing below the image
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'cover',
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    placeholderText: {
        color: '#a9a9a9',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '400',
    },
    buttonWrapper: {
        marginTop: 20,
        alignItems: "center",
    },

});

export default UploadLogoScreen;