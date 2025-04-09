import React from "react";
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
const API_URL = "http://localhost:8080";
function AddSmartphone() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [storage, setStorage] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("storage", storage);
        formData.append("price", price);
        formData.append("image", image);
        console.log(
            formData.forEach((value, key) => {
                console.log(key, value);
            })
        );
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/smartphone`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData, // Send as FormData to handle file upload
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                alert("Phone added successfully!");
                setName("");
                setBrand("");
                setStorage("");
                setPrice("");
                setImage(null);
                setPreview("");
            } else {
                alert("Failed to add phone.");
            }
        } catch (error) {
            console.error("Error adding phone:", error);
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Add New Phone</h2>
                    <Form onSubmit={handleSubmit}>
                        {/* Phone Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Brand Selection */}
                        <Form.Group className="mb-3">
                            <Form.Label>Brand</Form.Label>
                            <Form.Select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                            >
                                <option value="">Select Brand</option>
                                <option value="Apple">Apple</option>
                                <option value="Samsung">Samsung</option>
                                <option value="Google">Google</option>
                                <option value="Xiaomi">Xiaomi</option>
                                <option value="Vivo">Vivo</option>
                                <option value="OnePlus">OnePlus</option>
                                <option value="Nokia">Nokia</option>
                                <option value="Motorola">Motorola</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Storage Selection */}
                        <Form.Group className="mb-3">
                            <Form.Label>Storage</Form.Label>
                            <Form.Select
                                value={storage}
                                onChange={(e) => setStorage(e.target.value)}
                                required
                            >
                                <option value="">Select Storage</option>
                                <option value="256GB">256GB</option>
                                <option value="512GB">512GB</option>
                                <option value="1TB">1TB</option>
                                <option value="2TB">2TB</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Price Input */}
                        <Form.Group className="mb-3">
                            <Form.Label>Price ($)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Image Upload & Preview */}
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </Form.Group>

                        {preview && (
                            <div className="mb-3">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: "100%",
                                        maxHeight: "200px",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button variant="primary" type="submit">
                            Add Phone
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddSmartphone;
