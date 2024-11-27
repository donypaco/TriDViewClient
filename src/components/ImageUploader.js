// ImageUploader.js
import React, { useState } from 'react';

export default function ImageUploader ({ onFileChange }) {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);

        // Pass the selected file to parent component via onFileChange
        if (onFileChange) {
            onFileChange(file);
        }
    };

    return (
        <div>
            <label htmlFor="photo">Upload Photo</label>
            <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleFileChange}
            />
            {uploadedFile && (
                <div style={{ marginTop: '1rem' }}>
                    <strong>Selected File:</strong> {uploadedFile.name}
                    <br />
                    <img
                        src={URL.createObjectURL(uploadedFile)}
                        alt="Preview"
                        style={{ maxWidth: '200px', marginTop: '1rem' }}
                    />
                </div>
            )}
        </div>
    );
};