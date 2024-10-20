import React from 'react';
import { Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const LogoUploader = ({ setFieldValue }) => {
    const uploadLogo = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };

        launchImageLibrary(options, (response) => {
            if (response.assets) {
                const logoKey = response.assets[0].fileName;
                const base64File = response.assets[0].base64;
                setFieldValue('logoKey', logoKey);
                setFieldValue('base64File', base64File);
            }
        });
    };

    return <Button title="Upload Logo" onPress={uploadLogo} />;
};

export default LogoUploader;