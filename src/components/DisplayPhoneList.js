import React from "react";
import { useState, useEffect } from "react";
import { Card, Row, Col, Container, Spinner, Alert } from "react-bootstrap";
function DisplayPhoneList() {
    const API_URL = "react-node-app-backend-production.up.railway.app";
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    useEffect(() => {
        fetch(`${API_URL}/smartphones`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Failed to load data. Status: ${response.status}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                setPhones(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message); // Store error message
                setLoading(false);
            });
    }, []);

    return (
        <Container className="mt-4">
            {loading ? (
                // Show spinner while loading
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                // Show error message if request fails
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            ) : (
                <Row>
                    {phones.map((phone) => (
                        <Col
                            key={phone._id}
                            md={3}
                            sm={6}
                            xs={12}
                            className="mb-4"
                        >
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={`${API_URL}${phone.image}`}
                                    alt={phone.name}
                                    style={{
                                        height: "200px",
                                        objectFit: "contain",
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title>{phone.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Brand:</strong> {phone.brand}{" "}
                                        <br />
                                        <strong>Storage:</strong>{" "}
                                        {phone.storage} <br />
                                        <strong>Price:</strong> ${phone.price}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default DisplayPhoneList;
