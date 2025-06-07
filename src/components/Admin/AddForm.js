import React, { useState, useContext } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import { ItemsContext } from "../../context/ItemsContext";

const AddForm = ({ open, handleClose }) => {
    const { addItem } = useContext(ItemsContext);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageFile: null
    });
    const [previewUrl, setPreviewUrl] = useState("");

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const uploadImage = async (file) => {
        const apiKey = process.env.REACT_APP_IMGBB_API_KEY;

        const formData = new FormData();
        formData.append("key", apiKey);     // API key
        formData.append("image", file);     // Raw File object
        // Check imgbb API docs for other potential required parameters, e.g., 'expiration'
        // formData.append("expiration", 600); // Example: Set expiration to 10 minutes

        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) { // Check the response status directly
            return data.data.display_url;     // Return uploaded image URL
        } else {
            console.error("Upload error:", data);
            // More specific error message could be extracted from data.error
            throw new Error(`Image upload failed with status ${response.status}: ${data.error?.message || 'Unknown error'}`);
        }
    };


    const handleSubmit = async e => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.imageFile) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const imageUrl = await uploadImage(formData.imageFile);

            const newItem = {
                id: Date.now().toString(),
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                image: imageUrl
            };

            addItem(newItem);
            handleClose();
            setFormData({ name: "", description: "", price: "", imageFile: null });
            setPreviewUrl("");
        } catch (err) {
            alert("Image upload failed. Please try again.");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Food Item</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    name="description"
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                    inputProps={{
                        maxLength: 100 // Set the maximum length here
                    }}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    name="price"
                    type="number"
                    fullWidth
                    value={formData.price}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                            setFormData(prev => ({ ...prev, imageFile: file }));
                            setPreviewUrl(URL.createObjectURL(file));
                        }
                    }}
                />

                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                            width: "100%",
                            maxHeight: "200px",
                            objectFit: "cover",
                            marginTop: "1rem"
                        }}
                    />
                )}
                {formData.imageFile && (
                    <Typography variant="caption">
                        Selected: {formData.imageFile.name}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" style={{ color: "#f44336", borderColor: "#f44336" }} onClick={handleClose}>Cancel</Button>
                <Button style={{ backgroundColor: "#333" }} variant="contained" onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddForm;
