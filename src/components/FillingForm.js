import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Alert,
    Platform
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

export default function FillingForm({ fields, onSubmit }) {
    const [formValues, setFormValues] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue || "";
            return acc;
        }, {})
    );

    const handleInputChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const errors = fields
            .filter((field) => field.required && !formValues[field.name])
            .map((field) => field.label);

        if (errors.length > 0) {
            Alert.alert("Error", `Please fill in: ${errors.join(", ")}`);
            return;
        }
        onSubmit(formValues);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {fields.map((field) => (
                <View key={field.name} style={styles.inputGroup}>
                    <Text style={styles.label}>{field.label}</Text>
                    {field.type === "text" ? 
                    (
                        <TextInput
                            style={styles.input}
                            value={formValues[field.name] || ""}
                            onChangeText={(text) =>
                                handleInputChange(field.name, text)
                            }
                            placeholder={field.placeholder || ""}
                        />
                    ) 
                    : field.type === "dropdown" ? 
                    (
                        <ModalDropdown
                        options={field.options.map(option => option.name)}                         
                        defaultValue="Select an option..."
                        textStyle={styles.text}
                        dropdownTextStyle={styles.dropdownText}
                        dropdownStyle={styles.dropdownStyle}
                    onSelect={(index, value) => {
                            // Handle selection
                            console.log(`Selected option: ${value}, Index: ${index}`);
                            handleInputChange(field.name, field.options[index].id); // Save the selected ID
                        }}
                    />
                    ) 
                    : null
                    }
                </View>
            ))}
            <View style={styles.buttonWrapper}>
                <Button title="Submit" onPress={handleSubmit} color="#000" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        color: "#000",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        elevation: 3, // Add shadow effect for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        flexGrow: 1,
    },
    dropdownText: {
        fontSize: 16,
        color: "#333",
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexGrow: 1,
    },
    dropdownStyle: {
        // position: 'absolute',
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        width: 200, // Adjust dropdown width as needed
        maxHeight: 200, // Limit the dropdown height
        marginTop: 8,
        elevation: 3, // Shadow for Android dropdown
    },
    container: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#f4f4f4",
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
        letterSpacing: 1,
        textTransform: "uppercase",
    },
    input: {
        height: 50, // Ensures a large enough tappable area
        fontSize: 16,
        color: "#000",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        borderRadius: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonWrapper: {
        marginTop: 20,
        alignItems: "center",
    },
});
