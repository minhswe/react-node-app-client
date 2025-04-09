import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('https://react-node-app-backend-production.up.railway.app//user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem("token", result.token);
      } else {
        setError(result.error || 'Invalid username or password.');
      }
    } catch (err) {
      setError('Server error.');
      console.error(err);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Sign In</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </Container>
  );
}

export default SignIn;
